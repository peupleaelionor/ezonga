import { Router } from 'express';
import { getFeed, updateProfile } from '../controllers/profile.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/feed', auth, getFeed);
router.put('/me', auth, updateProfile);

export default router;