"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";

import { fetchDiaries } from "@/lib/api/clientApi/diaries";

import css from "./default.module.css"
import { useDiaryStore } from "@/lib/store/diaryStore";

export default function DiaryDetailsDefault() {
  const searchParams = useSearchParams();

	const setDiaryEditing = useDiaryStore(state => state.setDiaryEditing);

  const diaryId = searchParams.get("diaryId");

  const { data: diaries } = useQuery({
    queryKey: ["diary"],
    queryFn: fetchDiaries,
  });

  const currentDiary = diaries?.find((item) => item._id === diaryId) ?? null;

  if (!currentDiary) {
    return (
			
      <div className={css.container}>
				<div className={css.empty_text}>
					Оберіть будь-яку нотатку для детального перегляду
				</div>
      </div>
    );
  } else setDiaryEditing(true)

  return <DiaryEntryDetails entry={currentDiary} />;
}