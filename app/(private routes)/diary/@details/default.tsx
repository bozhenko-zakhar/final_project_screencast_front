"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";

import { fetchDiaries } from "@/lib/api/clientApi/diaries";

import css from "./default.module.css"

export default function DiaryDetailsDefault() {
  const searchParams = useSearchParams();

  const diaryId = searchParams.get("diaryId");

  const { data: diaries } = useQuery({
    queryKey: ["diary"],
    queryFn: fetchDiaries,
  });

  const currentDiary =
    diaries?.find((item) => item._id === diaryId) ?? null;

		console.log(currentDiary)

  if (!currentDiary) {
    return (
			
      <div className={css.container}>
				<div className={css.empty_text}>
					Select diary entry
				</div>
      </div>
    );
  }

  return <DiaryEntryDetails entry={currentDiary} />;
}