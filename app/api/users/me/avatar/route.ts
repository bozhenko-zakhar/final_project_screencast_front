// app/api/users/me/avatar/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../../api";
import FormData from "form-data";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData();

    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const nodeFormData = new FormData();
    nodeFormData.append("avatar", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    const res = await api.patch("/users/me/avatar", nodeFormData, {
      headers: {
        Cookie: cookieStore.toString(),
        ...nodeFormData.getHeaders(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
