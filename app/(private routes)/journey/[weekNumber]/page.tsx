import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import JourneyDetails from "./JourneyDetails.client";
import { getBabyStateInfo, getMomStateInfo } from "@/lib/api/clientApi/weeks";
import { getServerBabyState, getServerMomState } from "@/lib/api/serverApi/weeks";
import { getCurrentWeek } from "@/lib/services/getCurrentWeek";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyDetails weekNumber={weekNumber} />
    </HydrationBoundary>
  );
}


