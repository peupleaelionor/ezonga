'use client';
import { useState } from 'react';
import { profileAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { User, Camera } from 'lucide-react';

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const [bio, setBio] = useState(user?.profile?.bio || '');
  const [vibe, setVibe] = useState(user?.profile?.vibe || 'chill');

  const handleSave = async () => {
    await profileAPI.updateMe({ bio, vibe });
    alert('Profil mis à jour !');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 mb-4">
          <img src={user?.profile?.photos || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" />
          <button className="absolute bottom-0 right-0 bg-zinc-900 p-2 rounded-full border border-zinc-700">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-2xl font-bold">{user?.profile?.name}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-zinc-400 text-sm mb-2 block">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500"
            rows={4}
          />
        </div>

        <div>
          <label className="text-zinc-400 text-sm mb-2 block">Vibe Actuelle</label>
          <div className="grid grid-cols-3 gap-2">
            {['chill', 'party', 'business'].map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                className={`p-3 rounded-xl border capitalize ${vibe === v ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-zinc-800'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="w-full py-4 bg-emerald-600 rounded-xl font-bold mt-6 hover:bg-emerald-500">
          SAUVEGARDER
        </button>
      </div>
    </div>
  );
}