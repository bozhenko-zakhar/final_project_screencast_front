"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import css from "./page.module.css";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { fetchDiaries } from "@/lib/api/clientApi/diaries";
import DiaryList from "@/components/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryPage = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");

  const { data: entries = [] } = useQuery({
    queryKey: ["diary"],
    queryFn: fetchDiaries,
  });

  const selectedEntry = useMemo(() => {
    if (!isDesktop || !selectedEntryId) return null;

    return entries.find((entry) => entry.id === selectedEntryId) ?? null;
  }, [entries, isDesktop, selectedEntryId]);

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
            <DiaryList onSelectEntry={setSelectedEntryId} />
          </div>

          <div className={css.detailsSection}>
            <DiaryEntryDetails entry={selectedEntry} />
          </div>
        </div>
      ) : (
        <div className={css.mobileLayout}>
          <DiaryList onSelectEntry={setSelectedEntryId} />
        </div>
      )}
    </div>
  );
};

export default DiaryPage;