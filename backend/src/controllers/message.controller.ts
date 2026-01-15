import { Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getMessages = async (req: AuthRequest, res: Response) => {
  const { otherUserId } = req.params;
  const userId = req.userId!;

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'asc' },
    include: { sender: { select: { profile: { select: { name: true } } } } }
  });

  res.json(messages);
};

export const getConversations = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  // Trouver tous les utilisateurs avec qui on a échangé des messages
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }]
    },
    select: {
      senderId: true,
      receiverId: true,
      sender: { select: { profile: { select: { name: true } } } },
      receiver: { select: { profile: { select: { name: true } } } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const conversations = new Map();
  messages.forEach(msg => {
    const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
    const otherProfile = msg.senderId === userId ? msg.receiver.profile : msg.sender.profile;
    if (!conversations.has(otherId)) {
      conversations.set(otherId, { id: otherId, name: otherProfile?.name || 'Unknown' });
    }
  });

  res.json(Array.from(conversations.values()));
};