import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest, serverApiRequest } from "@/app/lib/api/serverApi";

const UPDATE_AVATAR_ENDPOINT = process.env.USERS_AVATAR_ENDPOINT ?? "/users/avatar";

export async function PATCH(request: NextRequest) {
	const accessToken = getAccessTokenFromRequest(request);

	if (!accessToken) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const contentType = request.headers.get("content-type") ?? "";

	if (contentType.includes("multipart/form-data")) {
		const formData = await request.formData();

		if (!formData.has("avatar")) {
			return NextResponse.json({ message: "Field 'avatar' is required" }, { status: 400 });
		}

		const response = await serverApiRequest({
			endpoint: UPDATE_AVATAR_ENDPOINT,
			method: "PATCH",
			accessToken,
			body: formData,
		});

		return NextResponse.json(response.payload, { status: response.status });
	}

	const body = (await request.json()) as Record<string, unknown>;

	if (!body.avatar) {
		return NextResponse.json({ message: "Field 'avatar' is required" }, { status: 400 });
	}

	const response = await serverApiRequest({
		endpoint: UPDATE_AVATAR_ENDPOINT,
		method: "PATCH",
		accessToken,
		body: { avatar: body.avatar },
	});

	return NextResponse.json(response.payload, { status: response.status });
}