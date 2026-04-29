import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest, serverApiRequest } from "@/app/lib/api/serverApi";

const CURRENT_USER_ENDPOINT = process.env.USERS_ME_ENDPOINT ?? "/users/current";
const UPDATE_USER_ENDPOINT = process.env.USERS_UPDATE_ENDPOINT ?? "/users";

export async function GET(request: NextRequest) {
	const accessToken = getAccessTokenFromRequest(request);

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { payload, status } = await serverApiRequest({
		endpoint: CURRENT_USER_ENDPOINT,
		method: "GET",
		accessToken,
	});

	return NextResponse.json(payload, { status });
}

export async function PATCH(request: NextRequest) {
	const accessToken = getAccessTokenFromRequest(request);

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const body = (await request.json()) as Record<string, unknown>;
	const allowedFields = ["username", "email", "name"];
	const payload = Object.fromEntries(
		Object.entries(body).filter(([key, value]) => allowedFields.includes(key) && value !== undefined),
	);

	if (Object.keys(payload).length === 0) {
		return NextResponse.json(
			{ message: "At least one field is required: username, email or name" },
			{ status: 400 },
		);
	}

	const response = await serverApiRequest({
		endpoint: UPDATE_USER_ENDPOINT,
		method: "PATCH",
		accessToken,
		body: payload,
	});

	return NextResponse.json(response.payload, { status: response.status });
}