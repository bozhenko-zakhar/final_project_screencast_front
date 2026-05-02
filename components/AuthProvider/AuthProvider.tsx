'use client';
import { getMe, refreshSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);

  useEffect(() => {
    async function autorisation() {
      const isLogin = await refreshSession();
      if (isLogin) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearUser();
      }
    }
    autorisation();
  }, [clearUser, setUser]);

  return children;
}