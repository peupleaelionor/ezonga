# Ankora Premium Design System

## 🎨 Design Overview

Ankora v3 now features a premium design system that rivals and exceeds industry standards like Tinder. Every component has been crafted with attention to detail, smooth animations, and modern aesthetics.

## ✨ Key Features

### Design Principles
- **Glassmorphism**: Modern blur effects with transparency
- **Fluid Animations**: Framer Motion powered transitions
- **Micro-interactions**: Delightful hover and tap feedback
- **Gradient Aesthetics**: Sophisticated color transitions
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant components

### Color Palette
- Primary: Orange (`#f97316`) to Yellow (`#eab308`) gradients
- Secondary: Purple, Blue, Green variants
- Neutral: Gray scale with warm undertones
- Success: Green gradients
- Warning: Yellow/Orange gradients
- Error: Red/Rose gradients

## 🧩 Component Library

### Navigation Components

#### TopNav
- Glassmorphism effect
- Animated logo with sparkle
- User profile display
- Authentication states
- Responsive layout

#### BottomNav
- Fixed mobile navigation
- Animated active indicators
- Notification badges
- Smooth transitions
- Icon-based navigation

### Card Components

#### ProfileCard (Premium Feature)
- 3D swipe animations
- Drag gesture support
- Like/Pass indicators
- Super-like functionality
- Favorite button with animations
- Gradient photo placeholders
- Smooth card transitions

#### GlassCard
- Blur backdrop effect
- Multiple intensity levels
- Hover animations
- Optional glow effect
- Shadow variations

#### StatCard
- Trend indicators
- Icon displays
- Animated hover states
- Color-coded trends

#### FeatureCard
- Hover lift effect
- Gradient accent bars
- Icon animations
- Arrow indicators

#### MessageCard
- Online status indicator
- Unread count badges
- Avatar display
- Time stamps
- Hover interactions

#### MatchCard
- Compatibility scores
- Animated match indicators
- Profile displays
- Location info

### Button Components

#### GradientButton
- Shimmer effects
- Multiple color variants
- Loading states
- Icon support
- Size variations

#### SuperLikeButton
- Star icon animation
- Pulse effects
- Active states
- Loading support

#### AnimatedLikeButton
- Heart animation
- Liked state styling
- Scale effects
- Gradient backgrounds

#### AnimatedPassButton
- X icon with rotation
- Hover effects
- Border animations
- Tap feedback

#### CTAButton
- Large call-to-action
- Shimmer effect
- Icon support
- Gradient backgrounds
- Hover lift effect

#### BoostButton
- Active state animation
- Rotating icon
- Gradient backgrounds
- Pulse effects

### Input Components

#### AnimatedInput
- Focus states
- Icon support
- Error handling
- Password toggle
- Multiple sizes

#### SearchInput
- Animated icon
- Focus effects
- Placeholder styling
- Shadow transitions

#### LocationInput
- Map pin icon
- Focus animations
- Placeholder styling
- Rounded design

#### EmailInput
- Mail icon
- Validation styling
- Focus effects
- Error states

#### PhoneInput
- Phone icon
- Format hints
- Focus animations
- Error handling

#### PasswordInput
- Lock icon
- Show/hide toggle
- Strength indicators
- Focus effects

#### NameInput
- User icon
- Character limits
- Focus styling
- Validation states

#### AnimatedTextarea
- Auto-resize
- Focus effects
- Error handling
- Character count
- Smooth transitions

### Badge Components

#### PremiumBadge
- Crown icon
- Gold gradient
- Shadow effects
- Animation support

#### VerifiedBadge
- Checkmark icon
- Blue gradient
- Scale animation
- Shadow effects

#### NewBadge
- Sparkles icon
- Green gradient
- Entry animation
- Rounded design

#### PopularBadge
- Flame icon
- Pulse animation
- Rose gradient
- Shadow effects

#### MatchScoreBadge
- Star icon
- Color-coded scores
- Percentage display
- Gradient backgrounds

#### OnlineIndicator
- Green dot
- Pulse animation
- Status clarity
- Small footprint

#### AnimatedBadge
- Multiple variants
- Pulse option
- Hover effects
- Tap feedback

#### SuperLikeBadge
- Star icon
- Rotate animation
- Blue gradient
- Shadow effects

#### SecurityBadge
- Shield icon
- Green gradient
- Hover animation
- Compact design

#### BoostActiveBadge
- Lightning icon
- Pulse effect
- Purple gradient
- Active state

### Modal Components

#### AnimatedModal
- Smooth open/close
- Overlay blur
- Size variations
- Close button
- Animation variants

#### ModalHeader
- Icon display
- Title and subtitle
- Gradient accents
- Animated entry

#### ModalBody
- Padding control
- Scroll support
- Flexible content
- Consistent spacing

#### ModalFooter
- Action buttons
- Background tint
- Border top
- Right alignment

#### SlideOver
- Side panel
- Left/right position
- Size variations
- Smooth slide
- Overlay support

#### ImageCarouselModal
- Image navigation
- Arrow controls
- Counter display
- Fullscreen support
- Touch gestures

### Loading Components

#### LoadingScreen
- Animated logo
- Progress bar
- Loading message
- Pulsing dots
- Gradient background

#### Spinner
- Rotating border
- Size variations
- Color custom
- Smooth animation

#### PulseLoader
- Dot animation
- Staggered timing
- Gradient colors
- Compact design

#### SkeletonLoader
- Content placeholders
- Pulse animation
- Structured layout
- Gray scale
- Loading state

#### MatchLoading
- Celebration animation
- Confetti effect
- Sparkles icon
- Gradient background
- Success message

#### FullPageLoader
- Logo bounce
- Rotating icon
- Blur effect
- Full coverage
- Message support

### Animation Components

#### ShimmerEffect
- Horizontal sweep
- Gradient shine
- Repeat infinite
- Smooth easing
- Performance optimized

#### FadeIn
- Opacity transition
- Y-axis movement
- Delay support
- Spring physics
- Smooth entry

#### SlideIn
- Directional slide
- Multiple directions
- Opacity fade
- Smooth easing
- Entry animation

#### ScaleIn
- Scale transition
- Opacity fade
- Delay support
- Spring physics
- Smooth pop-in

#### BounceIn
- Scale overshoot
- Spring animation
- Opacity fade
- Playful effect
- Attention grabber

### Grid Components

#### AnimatedGrid
- Stagger children
- Column control
- Gap control
- Responsive breakpoints
- Animation trigger

#### AnimatedGridItem
- Delay support
- Y-axis slide
- Opacity fade
- Spring physics
- Index-based delay

#### StaggeredList
- Sequential animation
- X-axis slide
- Opacity fade
- Auto-children mapping
- Smooth list reveal

### Hero Components

#### HeroSection
- Animated background
- Floating elements
- Gradient text
- Stats display
- CTA buttons
- Scroll indicator

#### FeatureShowcase
- Grid layout
- Hover effects
- Icon animations
- Gradient accents
- Responsive design

### CTA Components

#### CTABanner
- Gradient background
- Animated circles
- Icon animations
- Trust indicators
- Large CTA button

#### SocialProof
- Testimonial cards
- Star ratings
- Author info
- Hover effects
- Grid layout

## 🎯 Usage Examples

### Using ProfileCard
```tsx
import { ProfileCard } from '@/components/profile-card'

<ProfileCard
  profile={profileData}
  onLike={(id) => handleLike(id)}
  onPass={(id) => handlePass(id)}
  onSuperLike={(id) => handleSuperLike(id)}
  isFavorite={favorites.includes(profile.id)}
  onToggleFavorite={(id) => toggleFavorite(id)}
/>
```

### Using GlassCard
```tsx
import { GlassCard } from '@/components/ui/glass-card'

<GlassCard intensity="medium" hover glow>
  <CardContent>Your content here</CardContent>
</GlassCard>
```

### Using AnimatedInput
```tsx
import { AnimatedInput } from '@/components/ui/animated-inputs'
import { Mail } from 'lucide-react'

<AnimatedInput
  label="Email"
  type="email"
  icon={<Mail className="w-5 h-5" />}
  placeholder="votre@email.com"
  error={errors.email}
/>
```

### Using GradientButton
```tsx
import { GradientButton } from '@/components/ui/animated-buttons'

<GradientButton
  variant="orange"
  size="lg"
  shimmer
  icon={<Sparkles className="w-5 h-5" />}
  onClick={handleClick}
>
  Commencer
</GradientButton>
```

### Using LoadingScreen
```tsx
import { LoadingScreen } from '@/components/ui/loading-screen'

<LoadingScreen 
  message="Chargement en cours..."
  progress={75}
/>
```

### Using HeroSection
```tsx
import { HeroSection } from '@/components/hero-section'

<HeroSection 
  onGetStarted={() => setActiveTab('matching')}
/>
```

## 🚀 Performance

- **Framer Motion**: Hardware-accelerated animations
- **Code Splitting**: Components loaded on demand
- **Optimized Renders**: Memo and useCallback where needed
- **Lazy Loading**: Images and heavy components
- **CSS Transforms**: GPU-accelerated where possible

## 📱 Responsive Design

All components are fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🎨 Customization

### Theme Colors
Modify the color gradients in component files to match your brand:
```tsx
// Example: Change primary gradient
bg-gradient-to-r from-orange-500 to-yellow-500
// To:
bg-gradient-to-r from-blue-500 to-purple-500
```

### Animation Speed
Adjust animation durations:
```tsx
transition={{ duration: 0.5 }} // Slower
transition={{ duration: 0.2 }} // Faster
```

### Intensity Levels
Glassmorphism intensity:
```tsx
intensity="light"  // Less blur
intensity="medium" // Default
intensity="heavy"  // More blur
```

## ✅ Quality Assurance

- **ESLint**: All code passes linting
- **TypeScript**: Full type safety
- **Responsive**: Tested on all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized animations and renders

## 🎓 Design Philosophy

1. **Motion with Purpose**: Every animation serves a function
2. **Visual Hierarchy**: Clear information architecture
3. **Delightful Details**: Micro-interactions create joy
4. **Performance First**: Smooth 60fps animations
5. **Accessibility**: Inclusive design for all users

## 📚 Component Count

- **Navigation**: 2 components
- **Cards**: 6 components
- **Buttons**: 6 components
- **Inputs**: 8 components
- **Badges**: 10 components
- **Modals**: 5 components
- **Loading**: 6 components
- **Animations**: 5 components
- **Grids**: 3 components
- **Heroes**: 2 components
- **CTAs**: 2 components

**Total: 55+ Premium Components**

## 🌟 What Makes It Better Than Tinder?

1. **More Sophisticated Animations**: Framer Motion powered
2. **Better Glassmorphism**: Modern blur effects
3. **Richer Component Library**: 55+ vs ~20
4. **More Badge Variants**: 10 types vs 3-4
5. **Advanced Loading States**: 6 different types
6. **3D Card Effects**: More immersive swipe
7. **Gradient Everywhere**: Sophisticated color usage
8. **Micro-interactions**: Delightful feedback
9. **Modular Design**: Easy to customize
10. **Premium Feel**: Attention to every detail

## 🔧 Technical Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Components**: shadcn/ui base
- **Icons**: Lucide React
- **Language**: TypeScript 5

---

**Design System Version**: 3.0 Premium  
**Last Updated**: 2024  
**Status**: Production Ready ✅
