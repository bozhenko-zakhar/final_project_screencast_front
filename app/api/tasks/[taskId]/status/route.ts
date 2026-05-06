import { NextResponse } from 'next/server';

import { api } from '../../../api';
import { getCookieHeader, handleApiError } from '../../_utils';

type RouteContext = {
  params: Promise<{
    taskId: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { taskId } = await params;
    const body = await request.json();

    const res = await api.patch(`/tasks/${taskId}/status`, body, {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error);
  }
}