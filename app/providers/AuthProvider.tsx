"use client";

import { createContext, useContext, useMemo, useState } from "react";

type User = {
	name: string;
	email: string;
	avatar: string;
};

type AuthContextValue = {
	user: User | null;
	isAuthenticated: boolean;
	clearUser: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const demoUser: User = {
	name: "Demo User",
	email: "demo@example.com",
	avatar: "DU"
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(demoUser);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			clearUser: () => setUser(null)
		}),
		[user]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider");
	}

	return context;
};
