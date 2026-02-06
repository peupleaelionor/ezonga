'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ShimmerEffect({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gray-200", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white rounded-3xl overflow-hidden shadow-xl", className)}>
      <div className="h-80 bg-gray-200">
        <ShimmerEffect className="h-full" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4">
          <ShimmerEffect className="h-full rounded-lg" />
        </div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/2">
          <ShimmerEffect className="h-full rounded-lg" />
        </div>
        <div className="h-4 bg-gray-200 rounded-lg w-full">
          <ShimmerEffect className="h-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={cn("rounded-full border-4 border-orange-200 border-t-orange-500", sizes[size])}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export function PulseDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-orange-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
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

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, direction = 'up' }: { children: React.ReactNode, direction?: 'up' | 'down' | 'left' | 'right' }) {
  const directions = {
    up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } }
  }

  return (
    <motion.div
      initial={directions[direction].initial}
      animate={directions[direction].animate}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  )
}

export function BounceIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: [0, 1.2, 1]
      }}
      transition={{
        duration: 0.5,
        times: [0, 0.6, 1],
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
