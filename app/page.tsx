import { cookies } from "next/headers";

import LehlehkaLayout from "./(private routes)/layout";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";
import { fetchTasks } from "@/lib/api/clientApi/tasks";
import DashboardClientPage from "./page.client";

export default async function DashboardPage() {
	const cookieStore = await cookies();

	const token = cookieStore.get("accessToken");

	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ["baby"],
			queryFn: token ? () => fetchPrivateWeeks() : () => fetchPublicWeeks(),
			staleTime: 5 * 60 * 1000,
		}),
		queryClient.prefetchQuery({
			queryKey: ["tasks"],
			queryFn: () => fetchTasks(),
			staleTime: 5 * 60 * 1000,
		}),
	])

	return (
		<LehlehkaLayout>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<DashboardClientPage token={token?.toString() ?? ""} />
			</HydrationBoundary>
		</LehlehkaLayout>
	);
}
