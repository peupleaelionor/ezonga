import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, age } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            name,
            age,
            bio: 'Nouvelle star d\'Moto !',
            photos: JSON.stringify(['https://via.placeholder.com/400']), // Placeholder
            vibe: 'chill',
            interests: JSON.stringify(['Musique', 'Rumba'])
          }
        }
      },
      include: {
        profile: true
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    
    res.status(201).json({ token, user: { id: user.id, email: user.email, profile: user.profile } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user.id, email: user.email, profile: user.profile } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({ 
    where: { id: req.userId }, 
    include: { profile: true } 
  });
  res.json(user);
};