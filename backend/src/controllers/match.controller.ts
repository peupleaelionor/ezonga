import { Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const swipe = async (req: AuthRequest, res: Response) => {
  const { targetId, action } = req.body;
  const userId = req.userId!;

  const existing = await prisma.match.findFirst({
    where: { OR: [{ senderId: userId, receiverId: targetId }, { senderId: targetId, receiverId: userId }] }
  });
  if (existing) return res.status(400).json({ error: "Action already taken" });

  await prisma.match.create({
    data: { senderId: userId, receiverId: targetId, status: action === 'like' ? 'pending' : 'rejected' }
  });

  if (action === 'like') {
    const reciprocal = await prisma.match.findFirst({
      where: { senderId: targetId, receiverId: userId, status: 'pending' }
    });

    if (reciprocal) {
      await prisma.match.updateMany({
        where: { OR: [{ senderId: userId, receiverId: targetId }, { senderId: targetId, receiverId: userId }] },
        data: { status: 'sika' }
      });
      return res.json({ success: true, sika: true });
    }
  }
  res.json({ success: true, sika: false });
};

// NOUVEAU : Récupérer la liste des matchs
export const getMatches = async (req: AuthRequest, res: Response) => {
  const matches = await prisma.match.findMany({
    where: {
      OR: [{ senderId: req.userId }, { receiverId: req.userId }],
      status: 'sika'
    },
    include: {
      sender: { include: { profile: true } },
      receiver: { include: { profile: true } }
    }
  });

  // On ne renvoie que l'Autre profil
  const formatted = matches.map(m => {
    return m.senderId === req.userId ? m.receiver : m.sender;
  });

  res.json(formatted);
};