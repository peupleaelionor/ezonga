'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, X, Star, MapPin, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileCardProps {
  profile: {
    id: string
    firstName: string
    age: number
    city: string
    country: string
    bio: string
    interests: string[]
    verified: boolean
    photos?: string[]
  }
  onLike: (id: string) => void
  onPass: (id: string) => void
  onSuperLike?: (id: string) => void
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}

export function ProfileCard({ profile, onLike, onPass, onSuperLike, isFavorite, onToggleFavorite }: ProfileCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        onLike(profile.id)
      } else {
        onPass(profile.id)
      }
    }
    setDirection(null)
  }

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.x > 50) setDirection('right')
    else if (info.offset.x < -50) setDirection('left')
    else setDirection(null)
  }

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      {/* Like/Pass Indicators */}
      <motion.div
        style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
        className="absolute top-1/2 -translate-y-1/2 left-8 -rotate-12 z-10 pointer-events-none"
      >
        <div className="text-6xl font-black text-green-500 drop-shadow-lg border-4 border-green-500 px-4 py-2 rounded-lg">
          LIKE
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
        className="absolute top-1/2 -translate-y-1/2 right-8 rotate-12 z-10 pointer-events-none"
      >
        <div className="text-6xl font-black text-red-500 drop-shadow-lg border-4 border-red-500 px-4 py-2 rounded-lg">
          NOPE
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="relative"
      >
        <Card className="overflow-hidden shadow-2xl rounded-3xl border-0">
          {/* Photo Section with Gradient Overlay */}
          <div className="relative h-[500px] bg-gradient-to-br from-orange-200 via-rose-200 to-yellow-200">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-black text-white">
                      {profile.firstName}, {profile.age}
                    </h2>
                    {profile.verified && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 border-2 border-white/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/90 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {profile.city}, {profile.country}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm line-clamp-2 mb-3">
                    {profile.bio}
                  </p>

                  {/* Interests Pills */}
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.slice(0, 3).map((interest, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                          {interest}
                        </Badge>
                      </motion.div>
                    ))}
                    {profile.interests.length > 3 && (
                      <Badge className="bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                        +{profile.interests.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {onToggleFavorite && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFavorite(profile.id)}
                    className="ml-2 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="absolute top-4 left-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl border-4 border-white/50">
                <span className="text-3xl font-black text-white">
                  {profile.firstName[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="flex items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-14 h-14 rounded-full border-2 border-red-400 hover:border-red-500 hover:bg-red-50 shadow-lg"
                  onClick={() => onPass(profile.id)}
                >
                  <X className="w-6 h-6 text-red-500" />
                </Button>
              </motion.div>

              {onSuperLike && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="lg"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                    onClick={() => onSuperLike(profile.id)}
                  >
                    <Star className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="lg"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg"
                  onClick={() => onLike(profile.id)}
                >
                  <Heart className="w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
