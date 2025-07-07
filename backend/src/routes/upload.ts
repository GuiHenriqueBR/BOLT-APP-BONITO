import { Router } from 'express';

const router = Router();

router.post('/image', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
    message: 'Upload routes will be implemented next'
  });
});

export default router;