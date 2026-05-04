import { nextServer } from "../api";

export type WeekFeelings = {
  weekNumber: number;
  feelings: {
    states: string[];
    sensationDescr: string;
  };
};

export const fetchWeekFeelings = async (
  weekNumber: number
): Promise<WeekFeelings> => {
  const { data } = await nextServer.get<WeekFeelings>(`/weeks/${weekNumber}`);
  return data;
};
// перевірити що повертає бекенд