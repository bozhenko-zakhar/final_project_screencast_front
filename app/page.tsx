import { cookies } from "next/headers";

import DashboardPage from '@/components/DashBoardPage/DashboardPage_main/DashboardPage_main';
import LehlehkaLayout from './(private routes)/layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPrivateWeeks, fetchPublicWeeks } from '@/lib/api/clientApi/weeks';

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken");

  const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["baby"],
		queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
	});

  return (
    <LehlehkaLayout>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<DashboardPage token={token?.toString() ?? ""}/>
			</HydrationBoundary>
    </LehlehkaLayout>
  );
  
}
