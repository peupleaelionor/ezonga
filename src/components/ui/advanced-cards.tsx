'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronRight, ArrowUpRight, TrendingUp, Users, Heart, MessageCircle } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function StatCard({ title, value, change, icon, trend = 'neutral', className }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={cn(
        "bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl shadow-orange-500/5",
        className
      )}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl">
              {icon}
            </div>
            {change && trend && (
              <div className={cn(
                "px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1",
                trendColors[trend]
              )}>
                {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {change}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-black text-gray-900">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color?: 'orange' | 'purple' | 'blue' | 'green'
  onClick?: () => void
}

export function FeatureCard({ icon, title, description, color = 'orange', onClick }: FeatureCardProps) {
  const colors = {
    orange: 'from-orange-500 to-yellow-500 hover:shadow-orange-500/30',
    purple: 'from-purple-500 to-pink-500 hover:shadow-purple-500/30',
    blue: 'from-blue-500 to-cyan-500 hover:shadow-blue-500/30',
    green: 'from-green-500 to-emerald-500 hover:shadow-green-500/30'
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="h-full border-0 shadow-xl bg-white overflow-hidden group">
        <div className={cn(
          "h-2 bg-gradient-to-r",
          colors[color]
        )} />
        <CardContent className="p-6">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          <motion.div
            className="flex items-center gap-2 mt-4 text-sm font-medium text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            En savoir plus
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface MessageCardProps {
  name: string
  message: string
  time: string
  avatar: string
  unread?: number
  online?: boolean
  onClick: () => void
}

export function MessageCard({ name, message, time, avatar, unread, online, onClick }: MessageCardProps) {
  return (
    <motion.div
      whileHover={{ x: 4, backgroundColor: "rgba(249, 115, 22, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {avatar}
          </div>
          {online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-gray-900">{name}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-600 truncate">{message}</p>
        </div>

        {unread && unread > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
          >
            {unread}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

interface MatchCardProps {
  name: string
  age: number
  city: string
  matchTime: string
  avatar: string
  compatibility?: number
  onClick: () => void
}

export function MatchCard({ name, age, city, matchTime, avatar, compatibility, onClick }: MatchCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl">
                {avatar}
              </div>
              {compatibility && compatibility >= 70 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold text-white">{compatibility}%</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}, {age}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4" />
                <span>{city}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Match il y a {matchTime}</span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface HighlightCardProps {
  image: string
  title: string
  subtitle: string
  onClick: () => void
}

export function HighlightCard({ image, title, subtitle, onClick }: HighlightCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-2xl group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500">
        {image}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{subtitle}</p>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 border-4 border-white/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1 }}
      />
    </motion.div>
  )
}
