import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import { JWTPayload, AuthenticatedUser } from '../types';

/**
 * Gera um token JWT para o usuário
 */
export const generateToken = (user: AuthenticatedUser): string => {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    userType: user.userType,
  };

  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as any,
    issuer: 'corujafix',
    audience: 'corujafix-users',
  };
  
  return jwt.sign(payload, config.jwt.secret, options);
};

/**
 * Gera um refresh token (válido por mais tempo)
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    config.jwt.secret,
    {
      expiresIn: '30d' as any, // 30 dias
      issuer: 'corujafix',
      audience: 'corujafix-refresh',
    }
  );
};

/**
 * Verifica e decodifica um token JWT
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      issuer: 'corujafix',
      audience: 'corujafix-users',
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Verifica um refresh token
 */
export const verifyRefreshToken = (token: string): { userId: string } => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      issuer: 'corujafix',
      audience: 'corujafix-refresh',
    }) as any;

    if (decoded.type !== 'refresh') {
      throw new Error('Invalid refresh token type');
    }

    return { userId: decoded.userId };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Refresh token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid refresh token');
    }
    throw new Error('Refresh token verification failed');
  }
};

/**
 * Extrai o token do header Authorization
 */
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

/**
 * Gera um token temporário para verificação de email
 */
export const generateEmailVerificationToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email, type: 'email_verification' },
    config.jwt.secret,
    {
      expiresIn: '24h' as any, // 24 horas
      issuer: 'corujafix',
      audience: 'corujafix-verification',
    }
  );
};

/**
 * Verifica token de verificação de email
 */
export const verifyEmailVerificationToken = (token: string): { userId: string; email: string } => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      issuer: 'corujafix',
      audience: 'corujafix-verification',
    }) as any;

    if (decoded.type !== 'email_verification') {
      throw new Error('Invalid verification token type');
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Verification token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid verification token');
    }
    throw new Error('Verification token failed');
  }
};

/**
 * Gera um token para recuperação de senha
 */
export const generatePasswordResetToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email, type: 'password_reset' },
    config.jwt.secret,
    {
      expiresIn: '1h' as any, // 1 hora
      issuer: 'corujafix',
      audience: 'corujafix-reset',
    }
  );
};

/**
 * Verifica token de recuperação de senha
 */
export const verifyPasswordResetToken = (token: string): { userId: string; email: string } => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret, {
      issuer: 'corujafix',
      audience: 'corujafix-reset',
    }) as any;

    if (decoded.type !== 'password_reset') {
      throw new Error('Invalid reset token type');
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Reset token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid reset token');
    }
    throw new Error('Reset token verification failed');
  }
};

/**
 * Decodifica um token sem verificação (para debug)
 */
export const decodeToken = (token: string): any => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

/**
 * Verifica se um token está próximo do vencimento
 */
export const isTokenExpiringSoon = (token: string, thresholdMinutes: number = 30): boolean => {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const thresholdTime = thresholdMinutes * 60 * 1000;

    return (expirationTime - currentTime) < thresholdTime;
  } catch (error) {
    return true;
  }
};