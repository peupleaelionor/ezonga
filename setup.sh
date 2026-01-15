#!/bin/bash

# ==========================================
# 🚀 EZONGA - GOD MODE SETUP SCRIPT
# ==========================================

echo "🚀 Construction de EZONGA en cours..."

# Nettoyage
rm -rf backend frontend node_modules package-lock.json

# --- 1. BACKEND ---
echo "⚙️  Création du Backend..."
mkdir -p backend/src/{config,middleware,routes,controllers} backend/prisma

cat > backend/package.json << 'EOF'
{
  "name": "ezonga-backend",
  "version": "1.0.0",
  "scripts": { "dev": "tsx watch src/app.ts", "build": "tsc", "start": "node dist/app.js" },
  "dependencies": {
    "@prisma/client": "^5.18.0", "cors": "^2.8.5", "dotenv": "^16.4.5", "express": "^4.19.2",
    "express-async-errors": "^3.1.1", "helmet": "^7.1.0", "socket.io": "^4.7.5", "zod": "^3.23.8",
    "bcryptjs": "^2.4.3", "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21", "@types/node": "^22.1.0", "prisma": "^5.18.0", "tsx": "^4.17.0", "typescript": "^5.5.4"
  }
}
EOF

cat > backend/tsconfig.json << 'EOF'
{ "compilerOptions": { "target": "ES2020", "module": "commonjs", "outDir": "./dist", "rootDir": "./src", "strict": true, "esModuleInterop": true }, "include": ["src/**/*"], "exclude": ["node_modules"] }
EOF

cat > backend/.env.example << 'EOF'
DATABASE_URL="postgresql://ezonga_user:ezonga_password@localhost:5432/ezonga"
JWT_SECRET="super_secret_key"
PORT=5000
EOF

cat > backend/prisma/schema.prisma << 'EOF'
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql", url = env("DATABASE_URL") }
model User {
  id String @id @default(uuid())
  email String @unique
  password String
  verified Boolean @default(false)
  profile Profile?
  sentMatches Match[] @relation("SenderMatches")
  receivedMatches Match[] @relation("ReceiverMatches")
}
model Profile {
  id String @id @default(uuid())
  userId String @unique
  name String
  age Int
  bio String? @db.Text
  location String?
  photos String[]
  vibe String @default("chill")
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
model Match {
  id String @id @default(uuid())
  senderId String
  receiverId String
  status String @default("pending")
  createdAt DateTime @default(now())
  sender User @relation("SenderMatches", fields: [senderId], references: [id], onDelete: Cascade)
  receiver User @relation("ReceiverMatches", fields: [receiverId], references: [id], onDelete: Cascade)
  @@unique([senderId, receiverId])
}
EOF

cat > backend/src/app.ts << 'EOF'
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { setupSocket } from './config/socket';
import { errorHandler } from './middleware/error';
import routes from './routes';
dotenv.config();
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api', routes);
setupSocket(io);
app.use(errorHandler);
httpServer.listen(5000, () => console.log(`🚀 Server running on 5000`));
EOF

cat > backend/src/config/db.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
EOF

cat > backend/src/config/socket.ts << 'EOF'
import { Server } from 'socket.io';
export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    socket.on('send_message', (data) => io.to(data.room).emit('receive_message', data));
  });
}
EOF

cat > backend/src/middleware/error.ts << 'EOF'
import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
};
EOF

cat > backend/src/routes/index.ts << 'EOF'
import { Router } from 'express';
const router = Router();
router.get('/health', (req, res) => res.json({ status: 'OK' }));
export default router;
EOF

# --- 2. FRONTEND ---
echo "⚙️  Création du Frontend..."
mkdir -p frontend/public frontend/src/app/\(app\) frontend/src/components/ui frontend/src/lib

cat > frontend/package.json << 'EOF'
{
  "name": "ezonga-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": {
    "next": "14.2.5", "react": "^18.3.1", "react-dom": "^18.3.1",
    "framer-motion": "^11.3.0", "lucide-react": "^0.400.0", "axios": "^1.7.2",
    "clsx": "^2.1.1", "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@types/node": "^20", "@types/react": "^18", "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19", "postcss": "^8.4.39", "tailwindcss": "^3.4.4", "typescript": "^5.5.3"
  }
}
EOF

cat > frontend/next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = { images: { domains: ['images.unsplash.com'] } };
export default nextConfig;
EOF

cat > frontend/tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: {} }, plugins: [] };
export default config;
EOF

cat > frontend/postcss.config.js << 'EOF'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
EOF

cat > frontend/tsconfig.json << 'EOF'
{ "extends": "@tsconfig/next/tsconfig.json", "compilerOptions": { "plugins": [{ "name": "next" }] }, "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], "exclude": ["node_modules"] }
EOF

cat > frontend/src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
body { background-color: #09090b; color: #fafafa; }
EOF

cat > frontend/src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "EZONGA | Boyé Malamu", description: "Tokokota na mboka na biso moko" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="fr"><body className={`${inter.className} antialiased`}>{children}</body></html>); }
EOF

cat > frontend/src/app/page.tsx << 'EOF'
import Link from "next/link";
import { Zap } from "lucide-react";
export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Zap className="w-20 h-20 text-emerald-500 mx-auto mb-8" />
        <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-yellow-500 bg-clip-text text-transparent">BOYÉ MALAMU</h1>
        <p className="text-2xl text-zinc-400 mb-10">Awa Esengeli Kokota.</p>
        <Link href="/app/feed"><button className="px-10 py-4 bg-emerald-600 rounded-full text-xl font-bold hover:scale-105 transition-transform">KOBOTA</button></Link>
      </main>
    </div>
  );
}
EOF

cat > frontend/src/app/\(app\)/layout.tsx << 'EOF'
export default function AppLayout({ children }: { children: React.ReactNode }) { return <div className="pt-20 pb-20 px-4">{children}</div>; }
EOF

mkdir -p frontend/src/app/\(app\)/feed

cat > frontend/src/app/\(app\)/feed/page.tsx << 'EOF'
'use client';
import { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
export default function Feed() {
  const [profiles] = useState([{ id: 1, name: 'Sarah', age: 24, bio: 'Passionnée de Rumba', photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'], location: 'Gombe' }]);
  return <div className="flex justify-center"><ProfileCard profile={profiles[0]} onSwipe={() => console.log('Swipe')} /></div>;
}
EOF

cat > frontend/src/components/ProfileCard.tsx << 'EOF'
'use client';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
export default function ProfileCard({ profile, onSwipe }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) { onSwipe('right'); } else if (info.offset.x < -100) { onSwipe('left'); }
  };
  return (
    <motion.div style={{ x, rotate }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}
      className="relative w-full max-w-md h-[600px] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
      <div className="relative h-full">
        <img src={profile.photos[0]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 w-full p-6 text-white">
          <h2 className="text-5xl font-bold">{profile.name}, {profile.age}</h2>
          <p className="mt-2 text-zinc-300">{profile.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
EOF

echo "✅ Fichiers générés avec succès !"
echo "💡 Pour démarrer :"
echo "   1. cd backend && npm install"
echo "   2. cd ../frontend && npm install"
echo "   3. cd backend && npx prisma generate && npx prisma db push"
echo "   4. npm run dev (dans deux terminaux différents)"
exit 0




