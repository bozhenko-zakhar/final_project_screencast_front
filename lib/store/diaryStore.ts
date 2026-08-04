import { create } from "zustand";
import { DiaryListItem } from "@/types/diary";

type DiaryStore = {
	currentDiary: DiaryListItem | null;
	setDiary: (currentDiary: DiaryListItem) => void;
	clearDiary: () => void;
	isDiaryEditing: boolean;
	setDiaryEditing: (switcher: boolean) => void;
}

export const useDiaryStore = create<DiaryStore>()((set) => ({
  currentDiary: null,
	isDiaryEditing: false,
  setDiary: (currentDiary: DiaryListItem) => {
    set(() => ({ currentDiary }));
  },
  clearDiary: () => {
    set(() => ({ currentDiary: null }));
  },
	setDiaryEditing: (switcher: boolean) => {
		set(() => ({isDiaryEditing: switcher}))
	}
}));