import type { NextRequest } from "next/server";

type ApiRequestOptions = {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	endpoint: string;
	accessToken: string;
	body?: FormData | Record<string, unknown>;
};

type ApiResponse<T> = {
	status: number;
	payload: T;
};

type UnknownPayload = Record<string, unknown> | { message: string };

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const TOKEN_COOKIE_NAMES = ["accessToken", "token", "jwt", "authToken"];

export const getAccessTokenFromRequest = (request: NextRequest) => {
	const authorizationHeader = request.headers.get("authorization");

	if (authorizationHeader?.toLowerCase().startsWith("bearer ")) {
		return authorizationHeader.slice(7).trim();
	}

	for (const cookieName of TOKEN_COOKIE_NAMES) {
		const token = request.cookies.get(cookieName)?.value;

		if (token) {
			return token;
		}
	}

	return null;
};

const parsePayload = async (response: Response): Promise<UnknownPayload> => {
	const text = await response.text();

	if (!text) {
		return { message: response.ok ? "ok" : "Request failed" };
	}

	try {
		return JSON.parse(text) as UnknownPayload;
	} catch {
		return { message: text };
	}
};

export const serverApiRequest = async <T = UnknownPayload>(
	options: ApiRequestOptions,
): Promise<ApiResponse<T | UnknownPayload>> => {
	if (!API_BASE_URL) {
		return {
			status: 500,
			payload: { message: "API_BASE_URL is not configured" },
		};
	}

	const { endpoint, accessToken, method = "GET", body } = options;

	const headers = new Headers({
		Authorization: `Bearer ${accessToken}`,
	});

	let requestBody: FormData | string | undefined;

	if (body instanceof FormData) {
		requestBody = body;
	} else if (body) {
		headers.set("Content-Type", "application/json");
		requestBody = JSON.stringify(body);
	}

	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method,
			headers,
			body: requestBody,
			cache: "no-store",
		});

		const payload = (await parsePayload(response)) as T | UnknownPayload;

		return {
			status: response.status,
			payload,
		};
	} catch {
		return {
			status: 502,
			payload: { message: "Cannot reach API server" },
		};
	}
};
