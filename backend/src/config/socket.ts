import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import prisma from './db';

export const setupSocket = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      socket.data.userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.data.userId);

    socket.on('join', (room: string) => {
      socket.join(room);
    });

    socket.on('sendMessage', async (data: { receiverId: string; content: string }) => {
      const senderId = socket.data.userId;
      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId: data.receiverId,
          content: data.content
        },
        include: { sender: { select: { profile: { select: { name: true } } } } }
      });

      io.to(data.receiverId).emit('newMessage', message);
      socket.emit('messageSent', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.data.userId);
    });
  });
};
