import bcrypt from 'bcryptjs';
import { User, UserType } from '@prisma/client';
import prisma from '../config/database';
import { 
  generateToken, 
  generateRefreshToken,
  generateEmailVerificationToken,
  generatePasswordResetToken,
  verifyRefreshToken 
} from '../utils/jwtUtils';
import { 
  RegisterRequest, 
  LoginRequest, 
  AuthenticatedUser,
  NotFoundError,
  ValidationError,
  UnauthorizedError 
} from '../types';
import config from '../config';
import { logger } from '../utils/logger';

/**
 * Service responsável por todas as operações de autenticação
 */
export class AuthService {
  
  /**
   * Registra um novo usuário
   */
  async register(data: RegisterRequest): Promise<{
    user: AuthenticatedUser;
    token: string;
    refreshToken: string;
    requiresEmailVerification: boolean;
  }> {
    try {
      // Verificar se o email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new ValidationError('Email already registered');
      }

      // Hash da senha
      const hashedPassword = await this.hashPassword(data.password);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          userType: data.userType,
          phone: data.phone,
          status: 'PENDING_VERIFICATION'
        }
      });

      // Criar perfil profissional se necessário
      if (data.userType === 'PROFESSIONAL') {
        await prisma.professionalProfile.create({
          data: {
            userId: user.id,
            verified: false,
            isAvailable: true,
            rating: 0,
            totalReviews: 0,
            totalJobs: 0
          }
        });
             }

      const authUser: AuthenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        status: user.status,
        avatar: user.avatar ?? undefined,
        emailVerified: user.emailVerified
      };

      // Gerar tokens
      const token = generateToken(authUser);
      const refreshToken = generateRefreshToken(user.id);

      // Gerar token de verificação de email
      const emailVerificationToken = generateEmailVerificationToken(user.id, user.email);

      logger.info('User registered successfully', { 
        userId: user.id, 
        email: user.email,
        userType: user.userType 
      });

      // TODO: Enviar email de verificação
      // await emailService.sendVerificationEmail(user.email, emailVerificationToken);

      return {
        user: authUser,
        token,
        refreshToken,
        requiresEmailVerification: true
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Registration failed', { error: errorMessage, email: data.email });
      throw error;
    }
  }

  /**
   * Faz login do usuário
   */
  async login(data: LoginRequest): Promise<{
    user: AuthenticatedUser;
    token: string;
    refreshToken: string;
  }> {
    try {
      // Buscar usuário por email
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: {
          professionalProfile: true
        }
      });

      if (!user) {
        throw new UnauthorizedError('Invalid email or password');
      }

      // Verificar senha
      const isPasswordValid = await this.verifyPassword(data.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid email or password');
      }

      // Verificar se o usuário está ativo
      if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
        throw new UnauthorizedError('Account is suspended or inactive');
      }

      // Atualizar último login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      const authUser: AuthenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        status: user.status,
        avatar: user.avatar ?? undefined,
        emailVerified: user.emailVerified
      };

      // Gerar tokens
      const token = generateToken(authUser);
      const refreshToken = generateRefreshToken(user.id);

      logger.info('User logged in successfully', { 
        userId: user.id, 
        email: user.email 
      });

      return {
        user: authUser,
        token,
        refreshToken
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Login failed', { error: errorMessage, email: data.email });
      throw error;
    }
  }

  /**
   * Atualiza o token usando refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    try {
      // Verificar refresh token
      const { userId } = verifyRefreshToken(refreshToken);

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
        throw new UnauthorizedError('Account is suspended or inactive');
      }

      const authUser: AuthenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        status: user.status,
        avatar: user.avatar ?? undefined,
        emailVerified: user.emailVerified
      };

      // Gerar novos tokens
      const newToken = generateToken(authUser);
      const newRefreshToken = generateRefreshToken(user.id);

      return {
        token: newToken,
        refreshToken: newRefreshToken
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Token refresh failed', { error: errorMessage });
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  /**
   * Verifica email do usuário
   */
  async verifyEmail(token: string): Promise<{ success: boolean }> {
    try {
      // Importar função do jwtUtils
      const { verifyEmailVerificationToken } = require('../utils/jwtUtils');
      const { userId, email } = verifyEmailVerificationToken(token);

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || user.email !== email) {
        throw new ValidationError('Invalid verification token');
      }

      if (user.emailVerified) {
        return { success: true }; // Já verificado
      }

      // Marcar email como verificado
      await prisma.user.update({
        where: { id: userId },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date(),
          status: user.status === 'PENDING_VERIFICATION' ? 'ACTIVE' : user.status
        }
      });

      logger.info('Email verified successfully', { userId, email });

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Email verification failed', { error: errorMessage });
      throw new ValidationError('Invalid or expired verification token');
    }
  }

  /**
   * Solicita recuperação de senha
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    try {
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Por segurança, não revelamos se o email existe
        return { success: true };
      }

      // Gerar token de reset
      const resetToken = generatePasswordResetToken(user.id, user.email);

      logger.info('Password reset requested', { userId: user.id, email });

      // TODO: Enviar email com link de reset
      // await emailService.sendPasswordResetEmail(user.email, resetToken);

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Password reset request failed', { error: errorMessage, email });
      throw error;
    }
  }

  /**
   * Reseta a senha usando token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
    try {
      // Importar função do jwtUtils
      const { verifyPasswordResetToken } = require('../utils/jwtUtils');
      const { userId, email } = verifyPasswordResetToken(token);

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || user.email !== email) {
        throw new ValidationError('Invalid reset token');
      }

      // Hash da nova senha
      const hashedPassword = await this.hashPassword(newPassword);

      // Atualizar senha
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });

      logger.info('Password reset successfully', { userId, email });

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Password reset failed', { error: errorMessage });
      throw new ValidationError('Invalid or expired reset token');
    }
  }

  /**
   * Altera a senha do usuário logado
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    try {
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Verificar senha atual
      const isCurrentPasswordValid = await this.verifyPassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new UnauthorizedError('Current password is incorrect');
      }

      // Hash da nova senha
      const hashedPassword = await this.hashPassword(newPassword);

      // Atualizar senha
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });

      logger.info('Password changed successfully', { userId });

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Password change failed', { error: errorMessage, userId });
      throw error;
    }
  }

  /**
   * Busca usuário por ID para autenticação
   */
  async getUserById(userId: string): Promise<AuthenticatedUser | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        status: user.status,
        avatar: user.avatar ?? undefined,
        emailVerified: user.emailVerified
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Get user by ID failed', { error: errorMessage, userId });
      return null;
    }
  }

  /**
   * Reenviar email de verificação
   */
  async resendVerificationEmail(email: string): Promise<{ success: boolean }> {
    try {
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.emailVerified) {
        throw new ValidationError('Email already verified');
      }

      // Gerar novo token de verificação
      const emailVerificationToken = generateEmailVerificationToken(user.id, user.email);

      logger.info('Verification email resent', { userId: user.id, email });

      // TODO: Enviar email de verificação
      // await emailService.sendVerificationEmail(user.email, emailVerificationToken);

      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Resend verification email failed', { error: errorMessage, email });
      throw error;
    }
  }

  /**
   * Hash da senha usando bcrypt
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.security.bcryptRounds);
  }

  /**
   * Verifica senha usando bcrypt
   */
  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

// Instância singleton do serviço
export const authService = new AuthService();