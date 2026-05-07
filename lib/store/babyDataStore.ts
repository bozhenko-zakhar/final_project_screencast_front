import { create } from "zustand";
import { BabyWeek } from "@/types/baby";

type WeekState = {
  babyState: BabyWeek | null;
  daysLeft: number | null;

  setData: (data: { babyState: BabyWeek; daysLeft: number }) => void;
};

export const useWeekStore = create<WeekState>((set) => ({
  babyState: null,
  daysLeft: null,

  setData: (data) => set(data),
}));
