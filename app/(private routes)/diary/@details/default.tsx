"use client";

import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import { useDiaryStore } from "@/lib/store/diaryStore";

export default function DiaryDetailsDefault() {
  const currentDiary = useDiaryStore(state => state.currentDiary);

  if (!currentDiary) {
    return (
      <div className="p-6 text-gray-500">
        Select diary entry
      </div>
    );
  }

  return <DiaryEntryDetails entry={currentDiary} />;
}