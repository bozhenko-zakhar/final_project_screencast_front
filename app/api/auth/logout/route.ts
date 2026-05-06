import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { logErrorResponse } from '../../utils/utils';

export async function POST() {
  const cookieStore = await cookies();

  try {
    const cookieHeader = cookieStore.toString();

    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}