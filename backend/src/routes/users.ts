import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'User routes will be implemented next'
  });
});

export default router;