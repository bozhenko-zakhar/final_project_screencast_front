"use client";

import { useSelectedDiaryEntry } from "@/lib/store/diaryStore";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";

export default function DiaryDetailsDefault() {
  const entry = useSelectedDiaryEntry();

  if (!entry) {
    return (
      <div className="p-6 text-gray-500">
        Select diary entry
      </div>
    );
  }

  return <DiaryEntryDetails entry={entry} />;
}