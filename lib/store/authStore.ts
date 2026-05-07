import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthStore {
  user: User| Partial<User> | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: true,
  user: {
    email: "demo@example.com",
    name: "Demo User",
    avatar: "DU",
    dueDate: "2026-10-17",
  },
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearUser: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));