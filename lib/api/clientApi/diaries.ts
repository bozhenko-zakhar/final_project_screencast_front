import { nextServer } from "../api";
import {
  DiaryEntry,
  BackendDiaryEntry,
  DiaryListItem,
  DiaryEntryDetail,
} from "@/types/diary";

const transformBackendEntry = (entry: BackendDiaryEntry): DiaryEntryDetail => ({
  _id: entry._id.$oid,
  title: entry.title,
  date: entry.date,
  description: entry.description,
  emotions: entry.emotions.map((emo) => ({
    _id: emo._id.$oid,
    title: emo.title,
  })),
});

export const createDiaryEntry = async (
  payload: DiaryEntry,
): Promise<DiaryEntry> => {
  const response = await nextServer.post<BackendDiaryEntry>(
    "/diaries",
    payload,
  );
  return response.data.data;
};

export const fetchDiaries = async (): Promise<DiaryListItem[]> => {
  const response = await nextServer.get("/diaries");
  return response.data.data;
};

export const getDiaryEntry = async (
  entryId: string,
): Promise<DiaryEntryDetail> => {
  const response = await nextServer.get<BackendDiaryEntry>(
    `/diaries/${entryId}`,
  );
  return transformBackendEntry(response.data);
};

export const updateDiaryEntry = async (
  entryId: string,
  payload: Partial<DiaryEntry>,
): Promise<void> => {
  await nextServer.patch(`/diaries/${entryId}`, payload);
};

export const deleteDiaryEntry = async (entryId: string): Promise<void> => {
  await nextServer.delete(`/diaries/${entryId}`);
};
