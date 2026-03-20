import { Router } from 'express';
import { getUserProgress, getHeatmapData } from '../controllers/progressController.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/', requireAuth, getUserProgress);
router.get('/heatmap', requireAuth, getHeatmapData);
export default router;