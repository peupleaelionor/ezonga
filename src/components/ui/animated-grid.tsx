'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export function AnimatedGrid({ children, className, columns = 2 }: AnimatedGridProps) {
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("grid gap-6", columnsClass[columns], className)}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedGridItemProps {
  children: React.ReactNode
  index: number
  className?: string
}

export function AnimatedGridItem({ children, index, className }: AnimatedGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredListProps {
  children: React.ReactNode
  className?: string
}

export function StaggeredList({ children, className }: StaggeredListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: i * 0.05,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
