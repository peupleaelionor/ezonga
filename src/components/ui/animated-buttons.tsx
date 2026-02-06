'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2, Sparkles, Heart, ArrowRight, Zap } from 'lucide-react'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'orange' | 'purple' | 'blue' | 'green'
  size?: 'sm' | 'md' | 'lg'
  shimmer?: boolean
  icon?: React.ReactNode
  loading?: boolean
}

export function GradientButton({ 
  children, 
  variant = 'orange', 
  size = 'md', 
  shimmer = true,
  icon,
  loading = false,
  className,
  ...props 
}: GradientButtonProps) {
  const gradients = {
    orange: 'from-orange-500 via-orange-600 to-yellow-500 hover:from-orange-600 hover:via-orange-700 hover:to-yellow-600',
    purple: 'from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600',
    blue: 'from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600',
    green: 'from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600'
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden rounded-2xl font-bold text-white shadow-xl transition-all duration-300",
          "bg-gradient-to-r",
          gradients[variant],
          sizes[size],
          "hover:shadow-2xl hover:shadow-orange-500/30",
          className
        )}
        disabled={loading}
        {...props}
      >
        {shimmer && !loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
        
        <div className="relative flex items-center gap-2">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : icon ? (
            icon
          ) : null}
          {children}
        </div>
      </Button>
    </motion.div>
  )
}

export function SuperLikeButton({ onClick, loading }: { onClick: () => void, loading?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={loading}
      className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 text-white animate-spin mx-auto" />
      ) : (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center h-full"
        >
          <StarIcon />
        </motion.div>
      )}
    </motion.button>
  )
}

function StarIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function AnimatedLikeButton({ onClick, liked }: { onClick: () => void, liked: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        "w-14 h-14 rounded-full shadow-xl transition-all duration-300",
        liked
          ? "bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/50"
          : "bg-gradient-to-br from-orange-500 to-yellow-500 shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50"
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Heart className={cn("w-7 h-7", liked ? "fill-white text-white" : "text-white")} />
      </motion.div>
    </motion.button>
  )
}

export function AnimatedPassButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-14 h-14 rounded-full border-2 border-red-400 bg-white/80 backdrop-blur-sm shadow-xl hover:border-red-500 hover:bg-red-50 transition-all duration-300"
    >
      <svg className="w-7 h-7 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  )
}

export function CTAButton({ children, onClick, icon }: { children: React.ReactNode, onClick: () => void, icon?: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 rounded-2xl font-bold text-white shadow-xl shadow-orange-500/30 overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex items-center gap-3">
        {icon || <Sparkles className="w-5 h-5" />}
        <span>{children}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  )
}

export function BoostButton({ onClick, active }: { onClick: () => void, active?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 rounded-xl font-bold transition-all duration-300 overflow-hidden",
        active
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
          : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200"
      )}
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={active ? { rotate: [0, 360] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Zap className={cn("w-4 h-4", active && "fill-white")} />
        </motion.div>
        <span>Boost</span>
      </div>

      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.button>
  )
}
