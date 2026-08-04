"use client";

import { useEffect } from "react";
import { getMe } from "@/lib/api/clientApi/users"
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import { setThemeByGender } from "@/lib/theme/setThemeByGender";
import axios from "axios";

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

				setThemeByGender(user.gender);

				document.body.dataset.theme =
					user.gender === "boy" || user.gender === "girl" ?
						user.gender
						: "neutral";
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 401) {
					clearUser();

					setThemeByGender(null);
					document.body.dataset.theme = "neutral";

					return;
				}

				console.error("Failed to fetch user:", err);
			}
		};

		fetchUser();
	}, [setUser, clearUser]);

	return children;
};
