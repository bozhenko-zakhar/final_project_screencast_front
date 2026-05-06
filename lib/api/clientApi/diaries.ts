import { nextServer } from "../api";
import { 
  DiaryEntry, 
  BackendDiaryEntry, 
  DiaryListItem, 
  DiaryEntryDetail 
} from "@/types/diary";

const transformBackendEntry = (entry: BackendDiaryEntry): DiaryEntryDetail => ({
  id: entry._id.$oid,
  title: entry.title,
  date: entry.date,
  description: entry.description,
  emotions: entry.emotions.map(emo => ({
    id: emo._id.$oid,
    title: emo.title,
  })),
});

const transformToListItem = (entry: BackendDiaryEntry): DiaryListItem => ({
  id: entry._id.$oid,
  title: entry.title,
  date: entry.date,
  emotions: entry.emotions.map(emo => ({
    id: emo._id.$oid,
    title: emo.title,
  })),
});

export const createDiaryEntry = async (payload: DiaryEntry): Promise<void> => {
  await nextServer.post("/diary", payload);
};

export const fetchDiaries = async (): Promise<DiaryEntryDetail[]> => {
  const response = await nextServer.get<BackendDiaryEntry[]>("/diary");
  return response.data.map(transformBackendEntry);
};

export const getDiaryEntry = async (entryId: string): Promise<DiaryEntryDetail> => {
  const response = await nextServer.get<BackendDiaryEntry>(`/diary/${entryId}`);
  return transformBackendEntry(response.data);
};

export const updateDiaryEntry = async (
  entryId: string,
  payload: Partial<DiaryEntry>
): Promise<void> => {
  await nextServer.put(`/diary/${entryId}`, payload);
};

export const deleteDiaryEntry = async (entryId: string): Promise<void> => {
  await nextServer.delete(`/diary/${entryId}`);
};