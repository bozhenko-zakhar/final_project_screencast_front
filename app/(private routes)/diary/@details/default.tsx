"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";

import { fetchDiaries } from "@/lib/api/clientApi/diaries";

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
      <div className="p-6 text-gray-500">
        Select diary entry
      </div>
    );
  }

  return <DiaryEntryDetails entry={currentDiary} />;
}