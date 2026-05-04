"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

type User = {
	name: string;
	email: string;
	avatar: string;
};

export const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

	useEffect(() => {
    const fetchUser = async () => {
      const user: User = { // тут пізніше зробити запит на отримання користувача
				name: "Demo User",
				email: "demo@example.com",
				avatar: "DU"
			};
			
			if (user) setUser(user);
    };
    fetchUser();
  }, [setUser]);

	return children
};
