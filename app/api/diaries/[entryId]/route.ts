import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { api } from "../../api";
import { logErrorResponse } from "../../utils/utils";

type Params = {
  params: Promise<{
    entryId: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { entryId } = await params;
    const body = await request.json();
    const cookieStore = await cookies();

    const res = await api.patch(`/diaries/${entryId}`, body, {
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
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { entryId } = await params;
    const cookieStore = await cookies();

    const res = await api.delete(`/diaries/${entryId}`, {
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
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}