'use client';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X } from 'lucide-react';

export default function ProfileCard({ profile, onSwipe }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacityLike = useTransform(x, [0, 100], [0, 1]);
  const opacityDislike = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-full max-w-md h-[600px] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-full">
        <img src={profile.photos || 'https://via.placeholder.com/400'} alt={profile.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Indicateurs de swipe */}
        <motion.div
          style={{ opacity: opacityLike }}
          className="absolute top-10 right-10 bg-green-500 rounded-full p-3"
        >
          <Heart className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          style={{ opacity: opacityDislike }}
          className="absolute top-10 left-10 bg-red-500 rounded-full p-3"
        >
          <X className="w-8 h-8 text-white" />
        </motion.div>

        <div className="absolute bottom-0 w-full p-6 text-white">
          <motion.h2
            className="text-5xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {profile.name}, {profile.age}
          </motion.h2>
          <motion.p
            className="mt-2 text-zinc-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {profile.bio}
          </motion.p>
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {profile.interests?.split(',').map((interest: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm">
                {interest.trim()}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
