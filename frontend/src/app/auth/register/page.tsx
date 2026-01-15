'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function Register() {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const [form, setForm] = useState({ email: '', password: '', name: '', age: 24 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authAPI.register(form);
      setAuth(res.data.user, res.data.token);
      router.push('/app/feed');
    } catch (err) {
      alert('Erreur d\'inscription');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">Bosala Compte</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500"
          onChange={e => setForm({ ...form, age: parseInt(e.target.value) })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full p-4 bg-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors">
          KOBOTA (S'INSCRIRE)
        </button>
      </form>
    </div>
  );
}