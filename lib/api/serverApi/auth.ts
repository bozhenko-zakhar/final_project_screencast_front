import { cookies } from "next/headers";
import { api } from "@/app/api/api";

export const refreshUserSession = async () => {
	const cookieStore = await cookies();

	const res = await api.post("/auth/refresh", {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	return res;
};