import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { api } from "../api";
import { logErrorResponse } from "../utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get("/emotions", {
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
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}