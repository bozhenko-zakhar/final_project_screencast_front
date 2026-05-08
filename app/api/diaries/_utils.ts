import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

import { logErrorResponse } from '../utils/utils';

export async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export function handleApiError(error: unknown) {
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