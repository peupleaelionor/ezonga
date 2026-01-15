'use client';
import { useState, useEffect } from 'react';
import ProfileCard from '@/components/ProfileCard';
import { profileAPI, matchAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function Feed() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) return;
    const fetchProfiles = async () => {
      try {
        const res = await profileAPI.getFeed();
        setProfiles(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [user]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentProfile = profiles[index];
    if (!currentProfile) return;

    await matchAPI.swipe(currentProfile.user.id, direction === 'right' ? 'like' : 'pass');
    
    if (direction === 'right') {
      // Simuler une notification de Match (Le backend le ferait en vrai)
      if (Math.random() > 0.5) alert("SIKA ! C'est un Match ! 💚");
    }

    setIndex(prev => prev + 1);
  };

  if (loading) return <div className="text-center text-zinc-500 mt-20">Chargement des profils...</div>;
  if (index >= profiles.length) return <div className="text-center text-zinc-500 mt-20">Plus de profils !</div>;

  return (
    <div className="flex flex-col items-center h-full">
      <div className="relative w-full h-[600px]">
        <ProfileCard profile={profiles[index]} onSwipe={handleSwipe} />
      </div>
    </div>
  );
}
