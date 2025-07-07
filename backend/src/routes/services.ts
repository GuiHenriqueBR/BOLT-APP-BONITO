import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Service routes will be implemented next'
  });
});

export default router;