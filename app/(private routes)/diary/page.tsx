import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchDiaries } from "@/lib/api/clientApi/diaries";
import DiariesClient from "./page.client";

const DiaryPage = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['diary'],
		queryFn: fetchDiaries,
	})

  return (
		
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DiariesClient />
		</HydrationBoundary>
  );
};

export default DiaryPage;
