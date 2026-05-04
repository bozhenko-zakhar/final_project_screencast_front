import { nextServer } from "../api";

export interface DiaryEntry {
  title: string;
  description: string;
  emotions: string[]; 
  date: string;
}

export const createDiaryEntry = async (payload: DiaryEntry): Promise<void> => {
  await nextServer.post("/diary", payload);
};