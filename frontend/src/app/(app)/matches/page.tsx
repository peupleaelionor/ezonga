'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Matches() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await fetch('http://localhost:5000/api/matches/list', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      }).then(r => r.json());
      setMatches(data);
    };
    fetchMatches();
  }, []);

  if (matches.length === 0) return <div className="text-center mt-20 text-zinc-500">Pas encore de matchs... Swipe plus !</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {matches.map((m) => (
        <Link key={m.id} href={`/app/chat/${m.id}`} className="relative group">
          <img src={m.profile.photos || 'https://via.placeholder.com/400'} className="w-full h-40 object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
            <Heart className="text-emerald-500 fill-current w-8 h-8" />
          </div>
          <p className="text-center mt-2 font-bold">{m.profile.name}</p>
        </Link>
      ))}
    </div>
  );
}