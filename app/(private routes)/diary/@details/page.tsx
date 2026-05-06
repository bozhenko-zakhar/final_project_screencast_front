"use client";

import { useDiaryStore } from "@/lib/store/diaryStore";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";

export default function DiaryDetailsSlot() {
  const selectedEntry = useDiaryStore((state) => state.getSelectedEntry());

  return <DiaryEntryDetails entry={selectedEntry} />;
}