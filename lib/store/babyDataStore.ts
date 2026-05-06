import { create } from "zustand";

import { BabyWeek } from "@/types/baby";
import {
  fetchPrivateWeeks,
  getBabyStateInfo,
  PrivateWeeksResponse,
} from "../api/clientApi/weeks";

interface BabyDataStore {
  babyData: BabyWeek | Partial<BabyWeek> | null;
  privateData: PrivateWeeksResponse | null;
  isLoading: boolean;
  fetchData: (weekNumber: number) => Promise<void>;
}

export const useBabyDataStore = create<BabyDataStore>((set, get) => ({
  babyData: null,
  privateData: null,
  isLoading: false,

  fetchData: async (WeekNumber) => {
    if (get().isLoading || get().babyData?.weekNumber === WeekNumber) return;

    set({ isLoading: true });

    try {
      const [babyRes, privateRes] = await Promise.all([
        getBabyStateInfo(WeekNumber),
        fetchPrivateWeeks(),
      ]);

      set({ babyData: babyRes, privateData: privateRes, isLoading: false });
    } catch (err) {
      console.log("Loading error", err);
      set({ isLoading: false });
    }
  },
}));
