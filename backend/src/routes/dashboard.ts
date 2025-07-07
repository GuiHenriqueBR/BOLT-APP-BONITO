import { Router } from 'express';

const router = Router();

router.get('/client', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Dashboard routes will be implemented next'
  });
});

export default router;