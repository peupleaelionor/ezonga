'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  message?: string
  progress?: number
}

export function LoadingScreen({ message = "Chargement...", progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-yellow-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 mx-auto"
        >
          <Heart className="w-12 h-12 text-white fill-white" />
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-2">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-bold text-gray-800"
          >
            {message}
          </motion.p>
          
          {progress !== undefined && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500" />
            </motion.div>
          )}
        </div>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={cn(
          "rounded-full border-orange-200 border-t-orange-500",
          sizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export function PulseLoader() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-2xl animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-lg w-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-lg w-5/6 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-lg w-4/6 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function MatchLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-500/10 via-rose-500/10 to-yellow-500/10 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 mx-auto"
        >
          <Sparkles className="w-16 h-16 text-white" />
        </motion.div>

        <div className="space-y-2">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"
          >
            C'est un Match! 🎉
          </motion.p>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>

        <PulseLoader />
      </motion.div>
    </div>
  )
}

export function FullPageLoader({ message = "Chargement en cours..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 mx-auto">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl opacity-50 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <div className="space-y-3">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
          <p className="text-lg font-medium text-gray-700">{message}</p>
        </div>
      </motion.div>
    </div>
  )
}
