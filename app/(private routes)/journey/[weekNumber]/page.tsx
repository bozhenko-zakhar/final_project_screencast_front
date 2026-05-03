import css from "./JourneyDetails.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import JourneyDetails, {
  getBabyStateInfo,
  getMomStateInfo,
} from "./JourneyDetails.client";

type JourneyPageProps = {
  params: Promise<{ weekNUmber: string }>;
};

export default async function JourneyPage({params}: {
  params: Promise<{ weekNumber?: number }>;
}) {
  const { weekNumber } = await params;

  const week = weekNumber ? Number(weekNumber) : undefined;

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["baby", weekNumber],
    queryFn: () => getBabyStateInfo(weekNumber),
  });

  await queryClient.prefetchQuery({
    queryKey: ["mom", weekNumber],
    queryFn: () => getMomStateInfo(weekNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyDetails weekNumber={week} />
    </HydrationBoundary>
  );
}


