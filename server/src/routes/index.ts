import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Handle OPTIONS requests for all routes
router.options('*', (req, res) => {
  res.sendStatus(200);
});

// Public routes (no authentication required)
router.use('/auth', authRoutes);

// Protected routes (authentication required)
router.use('/api', authenticateToken, apiRoutes);

export default router;
