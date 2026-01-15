import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  profile: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

interface FeedState {
  profiles: any[];
  isLoading: boolean;
  lastFetched: number | null;
  setProfiles: (profiles: any[]) => void;
  setLoading: (loading: boolean) => void;
  shouldRefetch: () => boolean;
}

interface MatchState {
  matches: any[];
  isLoading: boolean;
  setMatches: (matches: any[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token, isLoading: false }),
      logout: () => set({ user: null, token: null, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export const useFeedStore = create<FeedState>((set, get) => ({
  profiles: [],
  isLoading: false,
  lastFetched: null,
  setProfiles: (profiles) => set({ profiles, lastFetched: Date.now() }),
  setLoading: (loading) => set({ isLoading: loading }),
  shouldRefetch: () => {
    const { lastFetched } = get();
    if (!lastFetched) return true;
    // Refetch if older than 5 minutes
    return Date.now() - lastFetched > 5 * 60 * 1000;
  },
}));

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  isLoading: false,
  setMatches: (matches) => set({ matches }),
  setLoading: (loading) => set({ isLoading: loading }),
}));