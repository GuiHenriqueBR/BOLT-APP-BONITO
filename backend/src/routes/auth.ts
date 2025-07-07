import { Router } from 'express';
import { AuthRequest } from '../types';
import { 
  AuthController,
  validateRegister,
  validateLogin,
  validatePasswordReset,
  validateResetPassword,
  validateChangePassword,
  checkValidationErrors
} from '../controllers/authController';
import { authenticate, optionalAuthenticate } from '../middleware/authMiddleware';

const router = Router();

// ================================
// ROTAS PÚBLICAS (SEM AUTENTICAÇÃO)
// ================================

/**
 * POST /auth/register
 * Registro de novo usuário (cliente ou profissional)
 */
router.post('/register', 
  validateRegister,
  checkValidationErrors,
  AuthController.register
);

/**
 * POST /auth/login
 * Login de usuário existente
 */
router.post('/login',
  validateLogin,
  checkValidationErrors,
  AuthController.login
);

/**
 * POST /auth/refresh-token
 * Atualizar token de acesso usando refresh token
 */
router.post('/refresh-token', AuthController.refreshToken);

/**
 * GET /auth/verify-email
 * Verificar email através do token enviado por email
 * URL: /auth/verify-email?token=TOKEN_AQUI
 */
router.get('/verify-email', AuthController.verifyEmail);

/**
 * POST /auth/request-password-reset
 * Solicitar reset de senha (envia email)
 */
router.post('/request-password-reset',
  validatePasswordReset,
  checkValidationErrors,
  AuthController.requestPasswordReset
);

/**
 * POST /auth/reset-password
 * Resetar senha usando token do email
 */
router.post('/reset-password',
  validateResetPassword,
  checkValidationErrors,
  AuthController.resetPassword
);

/**
 * POST /auth/resend-verification
 * Reenviar email de verificação
 */
router.post('/resend-verification', AuthController.resendVerificationEmail);

// ================================
// ROTAS PROTEGIDAS (COM AUTENTICAÇÃO)
// ================================

/**
 * POST /auth/logout
 * Logout do usuário (requer autenticação)
 */
router.post('/logout', authenticate, AuthController.logout);

/**
 * GET /auth/profile
 * Obter perfil do usuário atual
 */
router.get('/profile', authenticate, AuthController.getProfile);

/**
 * GET /auth/check
 * Verificar se o usuário está autenticado
 */
router.get('/check', authenticate, AuthController.checkAuth);

/**
 * POST /auth/change-password
 * Alterar senha do usuário logado
 */
router.post('/change-password',
  authenticate,
  validateChangePassword,
  checkValidationErrors,
  AuthController.changePassword
);

// ================================
// ROTAS DE DESENVOLVIMENTO
// ================================

if (process.env.NODE_ENV === 'development') {
  /**
   * GET /auth/test-auth
   * Endpoint para testar autenticação (apenas em desenvolvimento)
   */
  router.get('/test-auth', optionalAuthenticate, (req: AuthRequest, res) => {
    res.json({
      success: true,
      authenticated: !!req.user,
      user: req.user || null,
      message: 'Authentication test endpoint'
    });
  });
}

export default router;