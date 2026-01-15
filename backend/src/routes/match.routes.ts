import { Router } from 'express';
import { swipe, getMatches } from '../controllers/match.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/swipe', auth, swipe);
router.get('/list', auth, getMatches); // Nouvelle route

export default router;