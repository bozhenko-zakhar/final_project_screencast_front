import { NextResponse } from 'next/server';
import { api } from '../../api';
import { logErrorResponse } from '../../utils/utils';
import { isAxiosError } from 'axios';
import { getCookieHeader, handleApiError } from '../_utils';

type RouteContext = {
	params: Promise<{
		diaryId: string;
	}>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
	try {
		const { diaryId } = await params;
		const body = await request.json();

		const res = await api.patch(`/diaries/${diaryId}`, body, {
			headers: {
				Cookie: await getCookieHeader(),
			},
		});

		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleApiError(error);
	}
}



export async function DELETE(request: Request, { params }: RouteContext) {
  try {
		const { diaryId } = await params;

		const res = await api.delete(`/diaries/${diaryId}`, {
			headers: {
				Cookie: await getCookieHeader(),
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