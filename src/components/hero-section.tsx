'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Heart, Zap, Shield, Globe, Users, CheckCircle2 } from 'lucide-react'

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-yellow-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-60"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
          </motion.div>
          <span className="text-sm font-semibold text-gray-700">
            Nouvelle version 3.0 - Design Premium
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight"
        >
          L'amour africain
          <br />
          <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
            réinventé
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Découvrez une expérience de rencontre ultra-moderne avec des fonctionnalités IA avancées,
          un design exceptionnel et des connexions authentiques.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="h-16 px-8 text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-2xl shadow-orange-500/30 rounded-2xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Commencer Maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-8 text-lg font-semibold border-2 border-orange-300 hover:border-orange-400 hover:bg-orange-50 rounded-2xl"
            >
              Découvrir les Fonctionnalités
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: 'Utilisateurs', value: '50K+' },
            { icon: Heart, label: 'Matches', value: '10K+' },
            { icon: Shield, label: 'Profils Vérifiés', value: '95%' },
            { icon: Globe, label: 'Pays', value: '20+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
            >
              <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-orange-500 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

export function FeatureShowcase() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Matching Intelligent",
      description: "Notre algorithme IA analyse vos intérêts, valeurs et préférences pour trouver des compatibilités parfaites."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Vérification Photo",
      description: "Système avancé de vérification par IA pour garantir des profils authentiques et sécurisés."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Suggestions de Conversation",
      description: "Des suggestions intelligentes basées sur votre profil et celui de votre match pour briser la glace."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Connexion Panafricaine",
      description: "Connectez-vous avec des Africains du continent entier et de la diaspora mondiale."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Communauté Vérifiée",
      description: "Une communauté active et engagée avec des profils vérifiés pour des rencontres sérieuses."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Sécurité Maximale",
      description: "Protection avancée de vos données et modération active pour une expérience sécurisée."
    }
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Pourquoi choisir <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Ankora</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une application de rencontre nouvelle génération conçue pour l'Afrique moderne
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-6"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
