'use client'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Search, MapPin, Calendar, Mail, Phone, Lock, User } from 'lucide-react'
import { useState } from 'react'

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  error?: string
  showPasswordToggle?: boolean
}

export function AnimatedInput({ 
  label, 
  icon, 
  error, 
  showPasswordToggle = false,
  className,
  type,
  ...props 
}: AnimatedInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="relative">
      {label && (
        <motion.label
          className={cn(
            "block text-sm font-medium mb-2 transition-colors",
            error ? "text-red-500" : isFocused ? "text-orange-600" : "text-gray-700"
          )}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
            error ? "text-red-400" : isFocused ? "text-orange-500" : "text-gray-400"
          )}>
            {icon}
          </div>
        )}
        
        <motion.div
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Input
            type={inputType}
            className={cn(
              "h-12 rounded-2xl border-2 transition-all duration-300",
              "bg-white/80 backdrop-blur-sm",
              icon && "pl-12",
              showPasswordToggle && "pr-12",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : isFocused
                  ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20 shadow-lg shadow-orange-500/10"
                  : "border-gray-200 focus:border-orange-400 focus:ring-orange-500/20 hover:border-gray-300",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </motion.div>

        {showPasswordToggle && type === 'password' && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </motion.button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 flex items-center gap-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export function SearchInput({ 
  placeholder = "Rechercher...", 
  className,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Input
          placeholder={placeholder}
          className={cn(
            "h-12 rounded-2xl border-2 pl-12 transition-all duration-300",
            "bg-white/80 backdrop-blur-sm",
            isFocused
              ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20 shadow-lg shadow-orange-500/10"
              : "border-gray-200 focus:border-orange-400 focus:ring-orange-500/20 hover:border-gray-300",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
      
      <motion.div
        animate={isFocused ? { scale: 1.1, color: "#f97316" } : { scale: 1, color: "#9ca3af" }}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <Search className="w-5 h-5" />
      </motion.div>
    </div>
  )
}

export function LocationInput({ 
  placeholder = "Votre ville...",
  className,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Input
          placeholder={placeholder}
          className={cn(
            "h-12 rounded-2xl border-2 pl-12 transition-all duration-300",
            "bg-white/80 backdrop-blur-sm",
            isFocused
              ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20 shadow-lg shadow-orange-500/10"
              : "border-gray-200 focus:border-orange-400 focus:ring-orange-500/20 hover:border-gray-300",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
      
      <motion.div
        animate={isFocused ? { scale: 1.1, color: "#f97316" } : { scale: 1, color: "#9ca3af" }}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <MapPin className="w-5 h-5" />
      </motion.div>
    </div>
  )
}

export function EmailInput({ label, error, className, ...props }: AnimatedInputProps) {
  return (
    <AnimatedInput
      label={label}
      icon={<Mail className="w-5 h-5" />}
      error={error}
      type="email"
      className={className}
      {...props}
    />
  )
}

export function PhoneInput({ label, error, className, ...props }: AnimatedInputProps) {
  return (
    <AnimatedInput
      label={label}
      icon={<Phone className="w-5 h-5" />}
      error={error}
      type="tel"
      className={className}
      {...props}
    />
  )
}

export function PasswordInput({ label, error, className, ...props }: AnimatedInputProps) {
  return (
    <AnimatedInput
      label={label}
      icon={<Lock className="w-5 h-5" />}
      error={error}
      type="password"
      showPasswordToggle={true}
      className={className}
      {...props}
    />
  )
}

export function NameInput({ label, error, className, ...props }: AnimatedInputProps) {
  return (
    <AnimatedInput
      label={label}
      icon={<User className="w-5 h-5" />}
      error={error}
      className={className}
      {...props}
    />
  )
}

interface AnimatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function AnimatedTextarea({ label, error, className, ...props }: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      {label && (
        <motion.label
          className={cn(
            "block text-sm font-medium mb-2 transition-colors",
            error ? "text-red-500" : isFocused ? "text-orange-600" : "text-gray-700"
          )}
        >
          {label}
        </motion.label>
      )}
      
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <textarea
          className={cn(
            "w-full min-h-[120px] px-4 py-3 rounded-2xl border-2 transition-all duration-300",
            "bg-white/80 backdrop-blur-sm resize-none",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : isFocused
                ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20 shadow-lg shadow-orange-500/10"
                : "border-gray-200 focus:border-orange-400 focus:ring-orange-500/20 hover:border-gray-300",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
