"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getDiaryEntry } from "@/lib/api/clientApi/diaries";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryPage = () => {
	const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
	const isDesktop = useMediaQuery("(min-width: 1440px)");
	const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");

	const { data: selectedEntry = null } = useQuery({
		queryKey: ["diaryEntry", selectedEntryId],
		queryFn: () => (selectedEntryId ? getDiaryEntry(selectedEntryId) : null),
		enabled: !!selectedEntryId,
	});

	// Reset selection when view changes
	useEffect(() => {
		if (!isDesktop && selectedEntryId) {
			setSelectedEntryId(null);
		}
	}, [isDesktop, selectedEntryId]);

  const handleSelectEntry = (entryId: string) => {
    selectEntry(entryId);
  };

  return (
    <div className={css.container}>
      {(isDesktop || isTablet) && (
        <div className={css.greetingSection}>
          <GreetingBlock />
        </div>
      )}
      
      <div className={css.listSection}>
        <DiaryList onSelectEntry={handleSelectEntry} />
      </div>
    </div>
  );
};

export default DiaryPage;
