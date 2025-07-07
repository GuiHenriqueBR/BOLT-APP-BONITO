import { Response, NextFunction } from 'express';
import { UserType } from '@prisma/client';
import { AuthRequest, UnauthorizedError, ForbiddenError } from '../types';
import { extractTokenFromHeader, verifyToken } from '../utils/jwtUtils';
import { authService } from '../services/authService';
import { logger } from '../utils/logger';
import prisma from '../config/database';

/**
 * Middleware para autenticar usuários via JWT
 * Adiciona o usuário autenticado ao request (req.user)
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extrair token do header Authorization
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    // Verificar e decodificar o token
    const decoded = verifyToken(token);
    
    // Buscar usuário atual do banco
    const user = await authService.getUserById(decoded.userId);
    
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
      throw new UnauthorizedError('Account is suspended or inactive');
    }

    // Adicionar usuário ao request
    req.user = user;
    
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    logger.warn('Authentication failed', { 
      error: errorMessage,
      url: req.url,
      method: req.method,
      ip: req.ip
    });
    
    if (error instanceof UnauthorizedError) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: error.message
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }
  }
};

/**
 * Middleware opcional de autenticação
 * Adiciona o usuário ao request se o token estiver presente, mas não falha se não estiver
 */
export const optionalAuthenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      const user = await authService.getUserById(decoded.userId);
      
      if (user && user.status !== 'SUSPENDED' && user.status !== 'INACTIVE') {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Em caso de erro, simplesmente continua sem usuário
    next();
  }
};

/**
 * Middleware para autorizar apenas determinados tipos de usuário
 */
export const authorize = (...allowedUserTypes: UserType[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      if (!allowedUserTypes.includes(req.user.userType)) {
        throw new ForbiddenError('Insufficient permissions');
      }

      next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authorization failed';
      logger.warn('Authorization failed', { 
        error: errorMessage,
        userId: req.user?.id,
        userType: req.user?.userType,
        requiredTypes: allowedUserTypes,
        url: req.url,
        method: req.method
      });

      if (error instanceof ForbiddenError) {
        res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: error.message
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Authorization failed';
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: errorMessage
        });
      }
    }
  };
};

/**
 * Middleware para verificar se o usuário está verificado por email
 */
export const requireEmailVerification = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!req.user.emailVerified) {
      res.status(403).json({
        success: false,
        error: 'Email verification required',
        message: 'Please verify your email address to access this feature',
        code: 'EMAIL_NOT_VERIFIED'
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Verification check failed';
    logger.warn('Email verification check failed', { 
      error: errorMessage,
      userId: req.user?.id,
      url: req.url,
      method: req.method
    });

    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: errorMessage
    });
  }
};

/**
 * Middleware para verificar se o usuário é dono do recurso
 * Usado para endpoints como /users/:id onde o usuário só pode acessar seus próprios dados
 */
export const requireOwnership = (userIdParam: string = 'id') => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      const resourceUserId = req.params[userIdParam];
      
      if (!resourceUserId) {
        throw new ForbiddenError('Invalid resource identifier');
      }

      // Admins podem acessar qualquer recurso
      if (req.user.userType === 'ADMIN') {
        next();
        return;
      }

      if (req.user.id !== resourceUserId) {
        throw new ForbiddenError('Access denied: You can only access your own resources');
      }

      next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ownership check failed';
      logger.warn('Ownership check failed', { 
        error: errorMessage,
        userId: req.user?.id,
        resourceUserId: req.params[userIdParam],
        url: req.url,
        method: req.method
      });

      if (error instanceof ForbiddenError) {
        res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: error.message
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Ownership check failed';
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: errorMessage
        });
      }
    }
  };
};

/**
 * Middleware combinado para autenticação e autorização
 */
export const authenticateAndAuthorize = (...allowedUserTypes: UserType[]) => {
  return [authenticate, authorize(...allowedUserTypes)];
};

/**
 * Middleware para verificar se o usuário profissional está verificado
 */
export const requireProfessionalVerification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (req.user.userType !== 'PROFESSIONAL') {
      throw new ForbiddenError('Professional account required');
    }

    // Buscar perfil profissional
    const professionalProfile = await prisma.professionalProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!professionalProfile) {
      throw new ForbiddenError('Professional profile not found');
    }

    if (!professionalProfile.verified) {
      res.status(403).json({
        success: false,
        error: 'Professional verification required',
        message: 'Your professional account needs to be verified to access this feature',
        code: 'PROFESSIONAL_NOT_VERIFIED'
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Professional verification failed';
    logger.warn('Professional verification check failed', { 
      error: errorMessage,
      userId: req.user?.id,
      url: req.url,
      method: req.method
    });

    if (error instanceof ForbiddenError) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: error.message
      });
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Professional verification failed';
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: errorMessage
      });
    }
  }
};

/**
 * Middleware para logging de ações autenticadas
 */
export const logAuthenticatedAction = (action: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user) {
      logger.info(`Authenticated action: ${action}`, {
        userId: req.user.id,
        userType: req.user.userType,
        action,
        url: req.url,
        method: req.method,
        ip: req.ip
      });
    }
    next();
  };
};