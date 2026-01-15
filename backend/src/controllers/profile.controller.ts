import { Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getFeed = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  // Trouver les profils déjà vus (matchs enregistrés)
  const seenMatches = await prisma.match.findMany({
    where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    select: { senderId: true, receiverId: true }
  });

  const seenIds = new Set(
    seenMatches.flatMap(m => [m.senderId, m.receiverId])
  );
  seenIds.add(userId); // S'ajouter soi-même

  // Récupérer 20 profils aléatoires non vus
  const profiles = await prisma.profile.findMany({
    where: { NOT: { userId: { in: Array.from(seenIds) } } },
    take: 20,
    include: { user: { select: { id: true, email: true } } },
    orderBy: { id: 'asc' }
  });

  res.json(profiles);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { bio, vibe, photos } = req.body;
  const profile = await prisma.profile.update({
    where: { userId: req.userId },
    data: { bio, vibe, photos }
  });
  res.json(profile);
};