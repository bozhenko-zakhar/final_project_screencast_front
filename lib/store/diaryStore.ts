import { create } from "zustand";
import { DiaryEntryDetail, DiaryEntry, DiaryListItem } from "@/types/diary";
import { fetchDiaries, createDiaryEntry, updateDiaryEntry, deleteDiaryEntry } from "@/lib/api/clientApi/diaries";

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

// interface DiaryStore {
//   entries: DiaryEntryDetail[];
//   selectedEntryId: string | null;
//   isLoading: boolean;
//   error: string | null;

//   // Actions
//   fetchEntries: () => Promise<void>;
//   createEntry: (entry: DiaryEntry) => Promise<void>;
//   updateEntry: (id: string, updates: Partial<DiaryEntry>) => Promise<void>;
//   deleteEntry: (id: string) => Promise<void>;
//   selectEntry: (id: string | null) => void;
//   getSelectedEntry: () => DiaryEntryDetail | null;
// }

// export const useDiaryStore = create<DiaryStore>((set, get) => ({
//   entries: [],
//   selectedEntryId: null,
//   isLoading: false,
//   error: null,

//   fetchEntries: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const entries = await fetchDiaries() as DiaryEntryDetail[];
//       set({ entries, isLoading: false });
//     } catch {
//       set({ error: "Failed to fetch diary entries", isLoading: false });
//     }
//   },

//   createEntry: async (entry: DiaryEntry) => {
//     try {
//       const newEntry = await createDiaryEntry(entry);
//       set((state) => ({
//         entries: [newEntry, ...state.entries],
//         selectedEntryId: newEntry.id,
//       }));
//     } catch {
//       set({ error: "Failed to create diary entry" });
//     }
//   },

//   updateEntry: async (id: string, updates: Partial<DiaryEntry>) => {
//     try {
//       await updateDiaryEntry(id, updates);
//       // Refetch to sync
//       await get().fetchEntries();
//     } catch {
//       set({ error: "Failed to update diary entry" });
//     }
//   },

//   deleteEntry: async (id: string) => {
//     try {
//       await deleteDiaryEntry(id);
//       // Refetch to sync
//       await get().fetchEntries();
//       // Also clear selection if deleted
//       set((state) => ({
//         selectedEntryId: state.selectedEntryId === id ? null : state.selectedEntryId,
//       }));
//     } catch {
//       set({ error: "Failed to delete diary entry" });
//     }
//   },

//   selectEntry: (id: string | null) => {
//     set({ selectedEntryId: id });
//   },

//   getSelectedEntry: () => {
//     const { entries, selectedEntryId } = get();
//     if (!selectedEntryId) return null;
//     return entries.find((e) => e.id === selectedEntryId) || null;
//   },
// }));

// export const useSelectedDiaryEntry = () => {
//   return useDiaryStore((state) => {
//     return state.entries.find(
//       (entry) => entry.id === state.selectedEntryId
//     );
//   });
// };