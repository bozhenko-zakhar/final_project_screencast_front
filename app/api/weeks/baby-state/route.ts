import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../utils/utils';
import { isAxiosError } from 'axios';

// type Props = {
// 	params: Promise<{ weekNumber: number }>;
// }

export async function GET(req: Request) {
	try {
		const cookieStore = await cookies();

		const { searchParams } = new URL(req.url);
		const weekNumber = Number(searchParams.get('weekNumber'));

		const res = await api.get('/weeks/baby-state', {
			params: { weekNumber },
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