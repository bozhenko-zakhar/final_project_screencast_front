import { create } from "zustand";

import { BabyWeek } from "@/types/baby";
import {
  fetchPrivateWeeks,
  getBabyStateInfo,
  getMomStateInfo,
  PrivateWeeksResponse,
} from "../api/clientApi/weeks";
import { MomWeek } from "@/types/mom";

interface BabyDataStore {
  babyData: BabyWeek | null;
  momDate: MomWeek | null;
  privateData: PrivateWeeksResponse | null;
  fetchData: (weekNumber: number) => Promise<void>;
}

export const useBabyDataStore = create<BabyDataStore>((set, get) => ({
  babyData: null,
  momDate: null,
  privateData: null,

  fetchData: async (WeekNumber) => {
    if (get().babyData?.weekNumber === WeekNumber) {
      return;
    }

    try {
      const babyRes = await getBabyStateInfo(WeekNumber);
      const momRes = await getMomStateInfo(WeekNumber);

      set({
        babyData: babyRes,
        momDate: momRes,
      });

      let privateRes = null;
      try {
        privateRes = await fetchPrivateWeeks();
        set({ privateData: privateRes });
      } catch (err) {
        console.log("Loading error", err);
      }
    } catch (err) {
      console.log("Public loading error", err);
    }
  },
}));
