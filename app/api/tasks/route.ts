import { NextResponse } from 'next/server';

import { api } from '../api';
import { getCookieHeader, handleApiError } from './_utils';

export async function GET() {
  try {
    const res = await api.get('/tasks', {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await api.post('/tasks', body, {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error);
  }
}