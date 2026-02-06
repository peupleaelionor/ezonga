'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, Zap, MessageCircle, User, Sparkles } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  notification?: number
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'matching', label: 'Découvrir', icon: Zap, notification: 0 },
  { id: 'messages', label: 'Messages', icon: MessageCircle, notification: 2 },
  { id: 'profile', label: 'Profil', icon: User },
]

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe"
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-orange-500/10 p-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <motion.div
                  key={item.id}
                  className="relative"
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30"
                        : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                    )}
                  >
                    <div className="relative">
                      <Icon className={cn(
                        "w-6 h-6 transition-all duration-300",
                        isActive && "scale-110"
                      )} />
                      {item.notification && item.notification > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
                        >
                          {item.notification}
                        </motion.div>
                      )}
                    </div>
                    <span className="text-[10px] font-medium">
                      {item.label}
                    </span>
                  </Button>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Top Navigation with Glass Effect
export function TopNav({ isAuthenticated, user, onLogin, onRegister, onLogout }: {
  isAuthenticated: boolean
  user?: any
  onLogin: () => void
  onRegister: () => void
  onLogout: () => void
}) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-orange-500/5 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Ankora
                </h1>
                <p className="text-[10px] text-gray-500 font-medium">v3.0 PREMIUM</p>
              </div>
            </motion.div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      onClick={onLogin}
                      className="font-medium hover:bg-orange-50"
                    >
                      Connexion
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={onRegister}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 font-medium shadow-lg shadow-orange-500/30"
                    >
                      S'inscrire
                    </Button>
                  </motion.div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.firstName?.[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName}
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onLogout}
                      className="hover:bg-red-50 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
