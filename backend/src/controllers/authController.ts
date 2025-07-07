import { Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { UserType } from '@prisma/client';
import { 
  AuthRequest, 
  LoginRequest, 
  RegisterRequest, 
  ApiResponse,
  ValidationError as AppValidationError,
  UnauthorizedError
} from '../types';
import { authService } from '../services/authService';
import { logger } from '../utils/logger';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * Controller responsável pelos endpoints de autenticação
 */
export class AuthController {

  /**
   * Validações para registro
   */
  static validateRegister = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('userType')
      .isIn(['CLIENT', 'PROFESSIONAL'])
      .withMessage('User type must be CLIENT or PROFESSIONAL'),
    body('phone')
      .optional()
      .isMobilePhone('pt-BR')
      .withMessage('Invalid phone number format'),
  ];

  /**
   * Validações para login
   */
  static validateLogin = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ];

  /**
   * Validações para recuperação de senha
   */
  static validatePasswordReset = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
  ];

  /**
   * Validações para reset de senha
   */
  static validateResetPassword = [
    body('token')
      .notEmpty()
      .withMessage('Reset token is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  ];

  /**
   * Validações para alteração de senha
   */
  static validateChangePassword = [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  ];

  /**
   * Middleware para verificar erros de validação
   */
  static checkValidationErrors = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg
      }));

      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formattedErrors
      });
      return;
    }
    next();
  };

  /**
   * Registro de novo usuário
   */
  static register = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const registerData: RegisterRequest = req.body;

    const result = await authService.register(registerData);

    const response: ApiResponse = {
      success: true,
      data: {
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
        requiresEmailVerification: result.requiresEmailVerification
      },
      message: 'User registered successfully'
    };

    logger.info('User registration successful', { 
      userId: result.user.id,
      email: result.user.email,
      userType: result.user.userType
    });

    res.status(201).json(response);
  });

  /**
   * Login do usuário
   */
  static login = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const loginData: LoginRequest = req.body;

    const result = await authService.login(loginData);

    const response: ApiResponse = {
      success: true,
      data: {
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken
      },
      message: 'Login successful'
    };

    logger.info('User login successful', { 
      userId: result.user.id,
      email: result.user.email
    });

    res.status(200).json(response);
  });

  /**
   * Refresh token
   */
  static refreshToken = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppValidationError('Refresh token is required');
    }

    const result = await authService.refreshToken(refreshToken);

    const response: ApiResponse = {
      success: true,
      data: {
        token: result.token,
        refreshToken: result.refreshToken
      },
      message: 'Token refreshed successfully'
    };

    res.status(200).json(response);
  });

  /**
   * Logout do usuário
   */
  static logout = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    // TODO: Implementar blacklist de tokens se necessário
    // Por enquanto, o logout é feito no frontend removendo o token

    logger.info('User logout', { 
      userId: req.user?.id,
      email: req.user?.email
    });

    const response: ApiResponse = {
      success: true,
      message: 'Logout successful'
    };

    res.status(200).json(response);
  });

  /**
   * Verificação de email
   */
  static verifyEmail = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      throw new AppValidationError('Verification token is required');
    }

    const result = await authService.verifyEmail(token);

    const response: ApiResponse = {
      success: result.success,
      message: 'Email verified successfully'
    };

    logger.info('Email verification successful');

    res.status(200).json(response);
  });

  /**
   * Solicitar recuperação de senha
   */
  static requestPasswordReset = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { email } = req.body;

    const result = await authService.requestPasswordReset(email);

    const response: ApiResponse = {
      success: result.success,
      message: 'If the email exists, a password reset link has been sent'
    };

    res.status(200).json(response);
  });

  /**
   * Reset de senha
   */
  static resetPassword = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { token, password } = req.body;

    const result = await authService.resetPassword(token, password);

    const response: ApiResponse = {
      success: result.success,
      message: 'Password reset successfully'
    };

    logger.info('Password reset successful');

    res.status(200).json(response);
  });

  /**
   * Alteração de senha (usuário logado)
   */
  static changePassword = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;

    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    const result = await authService.changePassword(req.user.id, currentPassword, newPassword);

    const response: ApiResponse = {
      success: result.success,
      message: 'Password changed successfully'
    };

    logger.info('Password change successful', { userId: req.user.id });

    res.status(200).json(response);
  });

  /**
   * Reenviar email de verificação
   */
  static resendVerificationEmail = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      throw new AppValidationError('Email is required');
    }

    const result = await authService.resendVerificationEmail(email);

    const response: ApiResponse = {
      success: result.success,
      message: 'Verification email sent'
    };

    res.status(200).json(response);
  });

  /**
   * Obter perfil do usuário atual
   */
  static getProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    const response: ApiResponse = {
      success: true,
      data: req.user,
      message: 'Profile retrieved successfully'
    };

    res.status(200).json(response);
  });

  /**
   * Verificar status de autenticação
   */
  static checkAuth = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Not authenticated');
    }

    // Buscar dados atualizados do usuário
    const userData = await authService.getUserById(req.user.id);

    if (!userData) {
      throw new UnauthorizedError('User not found');
    }

    const response: ApiResponse = {
      success: true,
      data: {
        user: userData,
        authenticated: true
      },
      message: 'User is authenticated'
    };

    res.status(200).json(response);
  });
}

// Exportar métodos individuais para facilitar importação
export const {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  resendVerificationEmail,
  getProfile,
  checkAuth,
  validateRegister,
  validateLogin,
  validatePasswordReset,
  validateResetPassword,
  validateChangePassword,
  checkValidationErrors
} = AuthController;