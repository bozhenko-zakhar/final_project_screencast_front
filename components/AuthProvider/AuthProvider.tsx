'use client';

import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { getMe } from '@/lib/api/clientApi/users';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user: User = await getMe();
        setUser(user);
      } catch (error) {
        clearUser();

        if (isAxiosError(error) && error.response?.status === 401) {
          return;
        }

        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [setUser, clearUser]);

  return children;
};
