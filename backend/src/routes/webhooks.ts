import { Router } from 'express';

const router = Router();

router.post('/stripe', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Webhook routes will be implemented next'
  });
});

export default router;