import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/app/api/utils/utils";

export async function PATCH(
    req: Request,
    {params}: {params: Promise<{id: string}>}
) {
    try {
        const cookieStore = await cookies();
        const body = await req.json();
        const { id } = await params;

        const res = await api.patch(`/tasks/${id}/status`, body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}