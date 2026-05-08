"use client";

import { use, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import css from "./page.module.css";

import { fetchDiaries } from "@/lib/api/clientApi/diaries";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryEntryPage = ({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) => {
  const { entryId } = use(params);

  const {
    data: entries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["diary"],
    queryFn: fetchDiaries,
  });

  const entry = useMemo(() => {
    return entries.find((item) => item.id === entryId) ?? null;
  }, [entries, entryId]);

  return (
    <div className={css.container}>
      <div className={css.greetingSection}>
        <GreetingBlock />
      </div>

      <div className={css.content}>
        {isLoading ? (
          <div className={css.loading}>Завантаження запису...</div>
        ) : error ? (
          <div className={css.error}>Помилка завантаження записів</div>
        ) : !entry ? (
          <div className={css.error}>Запис не знайдено</div>
        ) : (
          <DiaryEntryDetails entry={entry} />
        )}
      </div>
    </div>
  );
};

export default DiaryEntryPage;