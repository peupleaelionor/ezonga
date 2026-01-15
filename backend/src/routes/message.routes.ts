import { Router } from 'express';
import { getMessages, getConversations } from '../controllers/message.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/conversations', auth, getConversations);
router.get('/:otherUserId', auth, getMessages);

export default router;