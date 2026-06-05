import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import JourneyDetails from "./JourneyDetails.client";
import { getServerBabyState, getServerMomState } from "@/lib/api/serverApi/weeks";

export default async function Page({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}) {
  const { weekNumber: weekParam } = await params;

  const weekNumber = Number(weekParam);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["baby", weekNumber],
      queryFn: () => getServerBabyState(weekNumber),
    }),
    queryClient.prefetchQuery({
      queryKey: ["mom", weekNumber],
      queryFn: () => getServerMomState(weekNumber),
    }),
  ]);

	console.log()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyDetails weekNumber={weekNumber} />
    </HydrationBoundary>
  );
}


