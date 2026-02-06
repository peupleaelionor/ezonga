'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, intensity = 'medium', hover = false, glow = false }: GlassCardProps) {
  const intensityStyles = {
    light: 'bg-white/60 backdrop-blur-sm border-white/40',
    medium: 'bg-white/70 backdrop-blur-md border-white/50',
    heavy: 'bg-white/80 backdrop-blur-lg border-white/60'
  }

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={cn(
        'relative overflow-hidden',
        intensityStyles[intensity],
        'shadow-xl',
        glow && 'shadow-2xl shadow-orange-500/20',
        className
      )}>
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10 pointer-events-none" />
        )}
        {children}
      </Card>
    </motion.div>
  )
}
