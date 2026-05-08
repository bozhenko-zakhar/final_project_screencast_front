"use client"

import css from "./page.client.module.css"

import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fetchDiaries } from "@/lib/api/clientApi/diaries";
import { useDiaryStore } from "@/lib/store/diaryStore";
import { DiaryListItem } from "@/types/diary";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DiariesClient = () => {
	const clearDiary = useDiaryStore(state => state.clearDiary)
	// const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
	// const isDesktop = useMediaQuery("(min-width: 1440px)");
	// const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");

	// const { data: selectedEntry = null } = useQuery({
	// 	queryKey: ["diaries"],
	// 	queryFn: () => fetchDiaries
	// });

	// Reset selection when view changes
	// useEffect(() => {
	// 	if (!isDesktop && selectedEntryId) {
	// 		setSelectedEntryId(null);
	// 	}
	// }, [isDesktop, selectedEntryId]);

  // const handleSelectEntry = (entryId: string) => {
  //   selectEntry(entryId);
  // };

	useEffect(() => {
		clearDiary()
	}, [clearDiary])
	return (
		<>
			{<div className={css.container}>
				{/* {(isDesktop || isTablet) && ( */}
					<div className={css.greetingSection}>
						<GreetingBlock />
					</div>
				{/* )} */}
				
				<div className={css.listSection}>
					<DiaryList />
				</div>
			</div>}
		</>
	)
};

export default DiariesClient;