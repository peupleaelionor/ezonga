'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CheckCircle2, Sparkles, Crown, Flame, Star, Shield, Zap } from 'lucide-react'

export function PremiumBadge({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg shadow-amber-500/30"
    >
      <Crown className={cn("text-white", sizes[size])} />
      <span className="text-xs font-bold text-white">PREMIUM</span>
    </motion.div>
  )
}

export function VerifiedBadge({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"
    >
      <CheckCircle2 className={cn("text-white", sizes[size])} />
    </motion.div>
  )
}

export function NewBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg shadow-green-500/30"
    >
      <Sparkles className="w-3 h-3 text-white" />
      <span className="text-xs font-bold text-white">NOUVEAU</span>
    </motion.div>
  )
}

export function PopularBadge() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg shadow-rose-500/30"
    >
      <Flame className="w-3 h-3 text-white" />
      <span className="text-xs font-bold text-white">POPULAIRE</span>
    </motion.div>
  )
}

export function MatchScoreBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return 'from-green-500 to-emerald-500 shadow-green-500/30'
    if (score >= 60) return 'from-blue-500 to-cyan-500 shadow-blue-500/30'
    if (score >= 40) return 'from-yellow-500 to-orange-500 shadow-yellow-500/30'
    return 'from-gray-500 to-slate-500 shadow-gray-500/30'
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r rounded-xl shadow-lg",
        getColor()
      )}
    >
      <Star className="w-4 h-4 text-white fill-white" />
      <div className="flex flex-col">
        <span className="text-[10px] text-white/80 font-medium">Compatibilité</span>
        <span className="text-lg font-black text-white">{score}%</span>
      </div>
    </motion.div>
  )
}

export function OnlineIndicator() {
  return (
    <div className="relative">
      <div className="w-3 h-3 bg-green-500 rounded-full" />
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </div>
  )
}

export function AnimatedBadge({ 
  children, 
  variant = 'default',
  pulse = false 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  pulse?: boolean
}) {
  const variants = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300',
    warning: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-300',
    error: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-300',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-300'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={pulse ? {
        scale: [1, 1.02, 1],
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      <Badge className={cn(
        "px-3 py-1 rounded-full font-medium border-2 shadow-md",
        variants[variant]
      )}>
        {children}
      </Badge>
    </motion.div>
  )
}

export function SuperLikeBadge() {
  return (
    <motion.div
      animate={{
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/40"
    >
      <Star className="w-3 h-3 text-white fill-white" />
      <span className="text-xs font-bold text-white">SUPER LIKE</span>
    </motion.div>
  )
}

export function SecurityBadge() {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-full shadow-lg shadow-green-500/30"
    >
      <Shield className="w-3 h-3 text-white" />
      <span className="text-[10px] font-bold text-white">SÉCURISÉ</span>
    </motion.div>
  )
}

export function BoostActiveBadge() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50"
    >
      <Zap className="w-4 h-4 text-white fill-white" />
      <span className="text-xs font-bold text-white">BOOST ACTIF</span>
    </motion.div>
  )
}
