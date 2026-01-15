import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import matchRoutes from './match.routes';
import messageRoutes from './message.routes';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'OK' }));

router.use('/auth', authRoutes);
router.use('/profiles', profileRoutes);
router.use('/matches', matchRoutes);
router.use('/messages', messageRoutes);

export default router;
