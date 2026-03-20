import { Router } from 'express';
import { getProblemOfDay, getAllProblems, getProblemById, submitAnswer } from '../controllers/problemController.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.get('/today', requireAuth, getProblemOfDay);
router.get('/', requireAuth, getAllProblems);
router.get('/:id', requireAuth, getProblemById);
router.post('/submit', requireAuth, submitAnswer);
export default router;