'use client'; // <--- LA LIGNÉ MAGIQUE QUI CORRIGE TOUT

import Link from "next/link";
import { Zap, ArrowRight, Shield, Flame, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Landing() {
  // Gestion de la largeur de l'écran pour les particules
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Génération des particules (Sécurisé)
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 100),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 100),
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Animé (Particules) */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 bg-emerald-500 rounded-full opacity-20 blur-sm"
              initial={{ x: p.x, y: p.y }}
              animate={{
                y: [p.y, p.y - 50, p.y],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Zap className="w-20 h-20 text-emerald-500 mx-auto mb-8 animate-pulse" />
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-yellow-500">
              BOYÉ MALAMU
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-400 mb-10 font-light max-w-2xl mx-auto">
            Awa Esengeli Kokota.<br/>
            <span className="text-emerald-400 font-semibold">Tokokota na mboka na biso moko.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/app/feed">
              <button className="group relative px-10 py-4 bg-emerald-600 rounded-full text-xl font-bold hover:scale-105 transition-transform overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  KOBOTA (Start) <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-10 py-4 border border-zinc-700 text-zinc-300 rounded-full text-xl font-bold hover:bg-zinc-900 hover:text-white transition-colors">
                Se Connecter
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-emerald-500/50 transition-colors">
            <Flame className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-emerald-400">SiKa Match</h3>
            <p className="text-zinc-400">L'algorithme qui comprend vraiment qui tu es. Pas de fake, juste du vibe.</p>
          </div>
          <div className="p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-emerald-500/50 transition-colors">
            <Shield className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-emerald-400">Libunga (Sécurité)</h3>
            <p className="text-zinc-400">Vérification vidéo biométrique. Ta sécurité est notre priorité noble.</p>
          </div>
          <div className="p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-emerald-500/50 transition-colors">
            <Users className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-emerald-400">Community</h3>
            <p className="text-zinc-400">Kinshasa, Brazzaville, et la diaspora. Connecte-toi à tes racines.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
