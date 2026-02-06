'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, Shield, Users, Zap, Globe, CheckCircle2, MessageCircle, Sparkles, ArrowRight, X, Upload, Filter, MapPin, Calendar, Star, LogOut, User, Camera, Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { Toast, useToast } from '@/components/Toast'

interface Profile {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  country: string
  bio?: string
  interests: string[]
  lookingFor: string
  verified: boolean
  photos?: string[]
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [matches, setMatches] = useState<Profile[]>([])
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [showProfileEditor, setShowProfileEditor] = useState(false)

  // Auth
  const { user, loading, isAuthenticated, login, logout, register } = useAuth()
  const { uploadPhoto, uploadMultiplePhotos } = usePhotoUpload()
  const { toasts, addToast, removeToast, success, error: toastError, info, warning } = useToast()

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    city: '',
    country: '',
    bio: '',
    interests: [] as string[],
    lookingFor: '',
    phone: ''
  })
  const [profileForm, setProfileForm] = useState({
    bio: '',
    interests: [] as string[],
    lookingFor: ''
  })

  // Filter states
  const [filters, setFilters] = useState({
    ageMin: 18,
    ageMax: 100,
    city: '',
    country: '',
    gender: '',
    lookingFor: ''
  })

  // Load mock data
  const loadMockData = useCallback(() => {
    const mockProfiles: Profile[] = [
      {
        id: '1',
        firstName: 'Aminata',
        lastName: 'Diop',
        age: 28,
        city: 'Paris',
        country: 'France',
        bio: 'Entrepreneure passionnée par la tech et la culture africaine. Cherche quelqu\'un de sérieux pour construire une vie ensemble.',
        interests: ['Entrepreneuriat', 'Tech', 'Cuisine', 'Voyage'],
        lookingFor: 'Relation sérieuse / Mariage',
        verified: true,
        photos: []
      },
      {
        id: '2',
        firstName: 'Kwame',
        lastName: 'Asante',
        age: 32,
        city: 'Dakar',
        country: 'Sénégal',
        bio: 'Architecte passionné par l\'urbanisme africain. J\'adore voyager et découvrir de nouvelles cultures.',
        interests: ['Architecture', 'Art', 'Voyage', 'Photographie'],
        lookingFor: 'Partenariat de longue durée',
        verified: true,
        photos: []
      },
      {
        id: '3',
        firstName: 'Fatou',
        lastName: 'Toure',
        age: 26,
        city: 'Abidjan',
        country: 'Côte d\'Ivoire',
        bio: 'Médecin passionnée par la santé publique. Cherche un partenaire qui partage mes valeurs.',
        interests: ['Médecine', 'Lecture', 'Sport', 'Cuisine'],
        lookingFor: 'Relation sérieuse / Mariage',
        verified: false,
        photos: []
      },
      {
        id: '4',
        firstName: 'Ibrahim',
        lastName: 'Kone',
        age: 35,
        city: 'Lyon',
        country: 'France',
        bio: 'Ingénieur en informatique. J\'aime la musique africaine et les soirées entre amis.',
        interests: ['Technologie', 'Musique', 'Cinéma', 'Sport'],
        lookingFor: 'Relation sérieuse',
        verified: true,
        photos: []
      },
      {
        id: '5',
        firstName: 'Nadia',
        lastName: 'Bensouda',
        age: 29,
        city: 'Casablanca',
        country: 'Maroc',
        bio: 'Designer graphique. Créative et ouverte d\'esprit, je cherche une relation basée sur la confiance.',
        interests: ['Design', 'Art', 'Voyage', 'Cuisine'],
        lookingFor: 'Partenariat de longue durée',
        verified: true,
        photos: []
      }
    ]
    setProfiles(mockProfiles)
    setMatches(mockProfiles.slice(0, 2))
    setConversations(mockProfiles.slice(0, 3).map((p, i) => ({
      id: p.id,
      user: p,
      lastMessage: i === 0 ? 'Salut! Comment ça va?...' : i === 1 ? 'On se voit quand?' : '🎤 Message audio',
      unreadCount: i === 0 ? 2 : 0
    })))
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadMockData()
    }
  }, [isAuthenticated, loadMockData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(loginForm.email, loginForm.password)
    if (result.success) {
      success('Connexion réussie!')
      setShowLogin(false)
      setActiveTab('matching')
    } else {
      toastError(result.error || 'Erreur de connexion')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await register(registerForm)
    if (result.success) {
      success('Compte créé avec succès!')
      setShowRegister(false)
      setActiveTab('matching')
    } else {
      toastError(result.error || 'Erreur lors de l\'inscription')
    }
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      success('Déconnexion réussie')
      setActiveTab('home')
      loadMockData()
    }
  }

  const handleLike = (profileId: string) => {
    if (!isAuthenticated) {
      warning('Connectez-vous pour liker des profils')
      setShowLogin(true)
      return
    }
    success('Like envoyé! 🎉')
    setProfiles(prev => prev.filter(p => p.id !== profileId))
  }

  const handlePass = (profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId))
  }

  const toggleFavorite = (profileId: string) => {
    setFavorites(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    )
    if (!favorites.includes(profileId)) {
      success('Ajouté aux favoris ⭐')
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id || 'me',
      content: messageInput,
      createdAt: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setMessageInput('')

    // Simulate response
    setTimeout(() => {
      const responses = [
        'C\'est super! 😊',
        'Je suis d\'accord!',
        'On devrait se rencontrer bientôt!',
        'Merci pour ton message',
        'Ça me fait plaisir!'
      ]
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        senderId: selectedConversation,
        content: responses[Math.floor(Math.random() * responses.length)],
        createdAt: new Date()
      }])
    }, 1000)
  }

  const toggleInterest = (interest: string) => {
    const updated = registerForm.interests.includes(interest)
      ? registerForm.interests.filter(i => i !== interest)
      : [...registerForm.interests, interest]
    setRegisterForm({ ...registerForm, interests: updated })
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      try {
        info('Upload des photos en cours...')
        const photos = await uploadMultiplePhotos(Array.from(files))
        success(`${photos.length} photo(s) ajoutée(s)`)
      } catch (err) {
        toastError('Erreur lors de l\'upload')
      }
    }
  }

  const applyFilters = () => {
    info('Filtres appliqués!')
    setShowFilters(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Navigation */}
      <nav className="border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Ankora v2
              </span>
            </div>
            <div className="flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" onClick={() => setShowLogin(true)}>
                    Connexion
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    onClick={() => setShowRegister(true)}
                  >
                    S'inscrire
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.firstName?.[0]}
                    </div>
                    <span className="font-medium text-sm hidden sm:block">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* HOME TAB */}
        <TabsContent value="home">
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-sm px-4 py-2">
                🌍 Version 2 - Plus de fonctionnalités, plus de possibilités
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                L'amour africain
                <span className="block bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mt-2">
                  réinventé
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez Ankora v2: upload de photos, filtres avancés, messagerie améliorée, et bien plus encore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => isAuthenticated ? setActiveTab('matching') : setShowRegister(true)}
                >
                  {isAuthenticated ? 'Voir les profils' : 'Créer mon profil'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* V2 Features */}
          <section className="container mx-auto px-4 py-16 bg-white/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                Nouveautés v2
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Des fonctionnalités puissantes pour trouver l'amour
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <Camera className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Photos Multiples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Ajoutez jusqu'à 6 photos pour montrer tous les aspects de votre personnalité.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <Filter className="w-6 h-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg">Filtres Avancés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Filtrer par âge, ville, pays, centre d'intérêt pour trouver votre match parfait.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Favoris</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Sauvegardez vos profils préférés pour les retrouver plus tard.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Recherche</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      Recherchez des profils spécifiques par nom, ville ou intérêts.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* MATCHING TAB */}
        <TabsContent value="matching">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Découvrir {profiles.length > 0 && `(${profiles.length})`}
                </h2>
                <div className="flex gap-2">
                  <Dialog open={showFilters} onOpenChange={setShowFilters}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtres
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filtres de recherche</DialogTitle>
                        <DialogDescription>Personnalisez vos critères de recherche</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>Âge: {filters.ageMin} - {filters.ageMax}</Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              type="number"
                              placeholder="Min"
                              value={filters.ageMin}
                              onChange={(e) => setFilters({ ...filters, ageMin: parseInt(e.target.value) || 18 })}
                            />
                            <Input
                              type="number"
                              placeholder="Max"
                              value={filters.ageMax}
                              onChange={(e) => setFilters({ ...filters, ageMax: parseInt(e.target.value) || 100 })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Ville</Label>
                          <Input
                            placeholder="Paris, Dakar..."
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Pays</Label>
                          <Select value={filters.country} onValueChange={(v) => setFilters({ ...filters, country: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Tous les pays" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Tous les pays</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Sénégal">Sénégal</SelectItem>
                              <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                              <SelectItem value="Maroc">Maroc</SelectItem>
                              <SelectItem value="Cameroun">Cameroun</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Genre</Label>
                          <Select value={filters.gender} onValueChange={(v) => setFilters({ ...filters, gender: v })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Tous" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Tous</SelectItem>
                              <SelectItem value="male">Homme</SelectItem>
                              <SelectItem value="female">Femme</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={applyFilters} className="w-full bg-gradient-to-r from-orange-500 to-yellow-500">
                          Appliquer les filtres
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {profiles.length > 0 ? (
                <Card className="border-2 border-orange-200 overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-96 bg-gradient-to-br from-orange-200 via-yellow-200 to-amber-200 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <Heart className="w-24 h-24 mx-auto mb-4 text-orange-400" />
                        <p className="text-lg font-medium">{profiles[0].firstName}, {profiles[0].age}</p>
                      </div>
                    </div>
                    {profiles[0].verified && (
                      <Badge className="absolute top-4 right-4 bg-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{profiles[0].firstName}, {profiles[0].age}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profiles[0].city}, {profiles[0].country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleFavorite(profiles[0].id)}
                        >
                          <Star className={`w-5 h-5 ${favorites.includes(profiles[0].id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{profiles[0].bio}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {profiles[0].interests.map((interest, i) => (
                        <Badge key={i} variant="secondary">{interest}</Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 border-2 border-red-200 hover:border-red-300 hover:bg-red-50 h-16"
                        onClick={() => handlePass(profiles[0].id)}
                      >
                        <X className="w-8 h-8 text-red-500" />
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 h-16"
                        onClick={() => handleLike(profiles[0].id)}
                      >
                        <Heart className="w-8 h-8" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-orange-200 p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plus de profils pour le moment</h3>
                  <p className="text-gray-600">Revenez plus tard pour découvrir de nouveaux profils!</p>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes conversations</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  {conversations.map((conv) => (
                    <Card
                      key={conv.id}
                      className={`cursor-pointer transition-all ${
                        selectedConversation === conv.id 
                          ? 'border-2 border-orange-500' 
                          : 'border-2 border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => {
                        setSelectedConversation(conv.id)
                        setMessages([
                          {
                            id: '1',
                            senderId: conv.id,
                            content: conv.lastMessage,
                            createdAt: new Date()
                          }
                        ])
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full flex items-center justify-center font-bold text-gray-700">
                            {conv.user.firstName[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{conv.user.firstName}</p>
                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <Badge className="bg-orange-500">{conv.unreadCount}</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="md:col-span-2">
                  {selectedConversation ? (
                    <Card className="border-2 border-orange-200 h-[600px] flex flex-col">
                      <CardHeader className="border-b border-orange-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full flex items-center justify-center font-bold text-gray-700">
                            {conversations.find(c => c.id === selectedConversation)?.user.firstName[0]}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {conversations.find(c => c.id === selectedConversation)?.user.firstName}
                            </CardTitle>
                            <CardDescription>En ligne</CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.senderId === user?.id ? 'justify-end' : ''}`}
                          >
                            {msg.senderId !== user?.id && (
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-700 text-xs">
                                {conversations.find(c => c.id === selectedConversation)?.user.firstName[0]}
                              </div>
                            )}
                            <div
                              className={`rounded-2xl px-4 py-3 max-w-xs ${
                                msg.senderId === user?.id
                                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-tr-none'
                                  : 'bg-gray-100 rounded-tl-none'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${msg.senderId === user?.id ? 'text-white/80' : 'text-gray-500'}`}>
                                {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>

                      <div className="border-t border-orange-200 p-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Écrivez votre message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button
                            size="icon"
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                            onClick={handleSendMessage}
                          >
                            <MessageCircle className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="border-2 border-orange-200 h-[600px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Sélectionnez une conversation</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              {user ? (
                <>
                  <Card className="border-2 border-orange-200 mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          {user.firstName[0]}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{user.firstName} {user.lastName}</CardTitle>
                          <CardDescription className="text-base">
                            {user.city}, {user.country} • {user.age} ans
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            {user.verified && (
                              <Badge className="bg-green-500">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Vérifié
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">À propos</Label>
                        <p className="text-gray-700 mt-1">{user.bio || 'Pas encore de bio'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Centres d'intérêt</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.interests && JSON.parse(user.interests).length > 0 ? (
                            JSON.parse(user.interests).map((interest: string, i: number) => (
                              <Badge key={i} variant="secondary">{interest}</Badge>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">Pas encore d'intérêts ajoutés</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Ce que je cherche</Label>
                        <p className="text-gray-700 mt-1">{user.lookingFor || 'Non spécifié'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={() => setShowProfileEditor(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Modifier mon profil
                  </Button>
                </>
              ) : (
                <Card className="border-2 border-orange-200 p-12 text-center">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Connectez-vous pour voir votre profil</h3>
                  <Button onClick={() => setShowLogin(true)} className="bg-gradient-to-r from-orange-500 to-yellow-500">
                    Se connecter
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connexion</DialogTitle>
            <DialogDescription>Connectez-vous à votre compte Ankora</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="votre@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="login-password">Mot de passe</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500">
              Se connecter
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un compte</DialogTitle>
            <DialogDescription>Rejoignez Ankora pour trouver votre âme sœur</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-firstname">Prénom</Label>
                <Input
                  id="register-firstname"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-lastname">Nom</Label>
                <Input
                  id="register-lastname"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-age">Âge</Label>
                <Input
                  id="register-age"
                  type="number"
                  min="18"
                  value={registerForm.age}
                  onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-gender">Genre</Label>
                <Select value={registerForm.gender} onValueChange={(v) => setRegisterForm({ ...registerForm, gender: v })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Homme</SelectItem>
                    <SelectItem value="female">Femme</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="register-password">Mot de passe</Label>
              <Input
                id="register-password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-city">Ville</Label>
                <Input
                  id="register-city"
                  value={registerForm.city}
                  onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-country">Pays</Label>
                <Select value={registerForm.country} onValueChange={(v) => setRegisterForm({ ...registerForm, country: v })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Sénégal">Sénégal</SelectItem>
                    <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                    <SelectItem value="Cameroun">Cameroun</SelectItem>
                    <SelectItem value="Maroc">Maroc</SelectItem>
                    <SelectItem value="Algérie">Algérie</SelectItem>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="register-lookingfor">Ce que vous cherchez</Label>
              <Select value={registerForm.lookingFor} onValueChange={(v) => setRegisterForm({ ...registerForm, lookingFor: v })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serious">Relation sérieuse / Mariage</SelectItem>
                  <SelectItem value="long-term">Partenariat de longue durée</SelectItem>
                  <SelectItem value="friendship">Amitié qui peut évoluer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Centres d'intérêt</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Musique', 'Cinéma', 'Sport', 'Voyage', 'Cuisine', 'Lecture', 'Danse', 'Art', 'Technologie', 'Nature'].map((interest) => (
                  <Badge
                    key={interest}
                    variant={registerForm.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      registerForm.interests.includes(interest)
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'hover:bg-orange-100 hover:border-orange-300'
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="register-bio">À propos de vous</Label>
              <Textarea
                id="register-bio"
                placeholder="Parlez un peu de vous..."
                value={registerForm.bio}
                onChange={(e) => setRegisterForm({ ...registerForm, bio: e.target.value })}
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500">
              Créer mon compte
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile Editor Modal */}
      <Dialog open={showProfileEditor} onOpenChange={setShowProfileEditor}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
            <DialogDescription>Mettez à jour vos informations</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Photos de profil</Label>
              <div className="mt-2">
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm text-gray-600">Cliquez pour uploader des photos</p>
                    <p className="text-xs text-gray-500">JPG, PNG (Max 5MB)</p>
                  </div>
                </Label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                placeholder="Parlez un peu de vous..."
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                rows={3}
              />
            </div>
            <Button 
              onClick={() => {
                success('Profil mis à jour!')
                setShowProfileEditor(false)
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              Enregistrer les modifications
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'bg-orange-500' : 'text-gray-600'}`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Accueil</span>
            </Button>
            <Button
              variant={activeTab === 'matching' ? 'default' : 'ghost'}
              onClick={() => {
                if (!isAuthenticated) {
                  warning('Connectez-vous pour voir les profils')
                  setShowLogin(true)
                } else {
                  setActiveTab('matching')
                }
              }}
              className={`flex flex-col items-center gap-1 ${activeTab === 'matching' ? 'bg-orange-500' : 'text-gray-600'}`}
            >
              <Zap className="w-6 h-6" />
              <span className="text-xs">Matchs</span>
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'bg-orange-500' : 'text-gray-600'}`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">Messages</span>
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => {
                if (!isAuthenticated) {
                  warning('Connectez-vous pour voir votre profil')
                  setShowLogin(true)
                } else {
                  setActiveTab('profile')
                }
              }}
              className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'bg-orange-500' : 'text-gray-600'}`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profil</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  )
}
