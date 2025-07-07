import { Router } from 'express';

const router = Router();

router.post('/create-intent', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Payment routes will be implemented next'
  });
});

export default router;