'use client';
import Link from 'next/link';
import { Home, MessageCircle, User, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  const navItems = [
    { icon: Home, label: 'Feed', href: '/feed' },
    { icon: Heart, label: 'Matches', href: '/matches' },
    { icon: MessageCircle, label: 'Chat', href: '/chat' },
    { icon: User, label: 'Profil', href: '/profile' },
  ];

  if (path === '/' || path.startsWith('/auth')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 flex justify-around p-4 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = path === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-emerald-400' : 'text-zinc-500'}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}