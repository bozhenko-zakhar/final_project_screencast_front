"use client";

import { useEffect } from "react";
import css from "./page.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDiaryStore } from "@/lib/store/diaryStore";
import DiaryList from "@/components/DiaryList/DiaryList";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const { selectEntry, fetchEntries } = useDiaryStore();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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
      
      {isDesktop ? (
        <div className={css.desktopLayout}>
          <div className={css.listSection}>
            <DiaryList onSelectEntry={handleSelectEntry} />
          </div>
          {/* Details will be rendered in the @details slot */}
        </div>
      ) : (
        <div className={css.mobileLayout}>
          <DiaryList onSelectEntry={handleSelectEntry} />
        </div>
      )}
    </div>
  );
};

export default DiaryPage;
