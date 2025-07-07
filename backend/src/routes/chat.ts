import { Router } from 'express';

const router = Router();

router.get('/conversations', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Chat routes will be implemented next'
  });
});

export default router;