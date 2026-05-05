"use client";

import { getMe } from "@/lib/api/clientApi/users";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

	useEffect(() => {
    const fetchUser = async () => {
      const user: User = await getMe();
			
			if (user) setUser(user);
    };
    fetchUser();
  }, [setUser]);

	return children
};
