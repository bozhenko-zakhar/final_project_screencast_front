import { nextServer } from "../api";

import type {
  BackendDiaryEntry,
  DiaryEntryDetail,
  DiaryEntryPayload,
  DiaryListItem,
  EmotionItem,
  MongoId,
} from "@/types/diary";

type ApiObject = Record<string, unknown>;

const getId = (id?: MongoId): string => {
  if (!id) return "";

  if (typeof id === "string") return id;

  return id.$oid ?? "";
};

const isObject = (value: unknown): value is ApiObject => {
  return typeof value === "object" && value !== null;
};

const getObjectField = (
  object: ApiObject,
  key: string
): ApiObject | null => {
  const value = object[key];

  return isObject(value) ? value : null;
};

const unwrapEntry = (
  response: unknown
): BackendDiaryEntry => {
  if (!isObject(response)) {
    throw new Error("Некоректна відповідь сервера");
  }

  const data = getObjectField(response, "data");

  if (data) {
    const entry =
      getObjectField(data, "diary") ||
      getObjectField(data, "entry") ||
      getObjectField(data, "diaryEntry") ||
      getObjectField(data, "result") ||
      data;

    return entry as unknown as BackendDiaryEntry;
  }

  const entry =
    getObjectField(response, "diary") ||
    getObjectField(response, "entry") ||
    getObjectField(response, "diaryEntry") ||
    getObjectField(response, "result") ||
    response;

  return entry as unknown as BackendDiaryEntry;
};

const unwrapList = (
  response: unknown
): BackendDiaryEntry[] => {
  if (Array.isArray(response)) {
    return response as BackendDiaryEntry[];
  }

  if (!isObject(response)) {
    return [];
  }

  if (Array.isArray(response.data)) {
    return response.data as BackendDiaryEntry[];
  }

  if (Array.isArray(response.diaries)) {
    return response.diaries as BackendDiaryEntry[];
  }

  if (Array.isArray(response.entries)) {
    return response.entries as BackendDiaryEntry[];
  }

  if (Array.isArray(response.result)) {
    return response.result as BackendDiaryEntry[];
  }

  const data = getObjectField(response, "data");

  if (data) {
    if (Array.isArray(data.diaries)) {
      return data.diaries as BackendDiaryEntry[];
    }

    if (Array.isArray(data.entries)) {
      return data.entries as BackendDiaryEntry[];
    }

    if (Array.isArray(data.result)) {
      return data.result as BackendDiaryEntry[];
    }
  }

  return [];
};

const normalizeEmotions = (
  emotions: BackendDiaryEntry["emotions"] = []
): Array<{
  id: string;
  title: string;
}> => {
  return emotions.map(
    (emotion: EmotionItem | string) => {
      if (typeof emotion === "string") {
        return {
          id: emotion,
          title: emotion,
        };
      }

      return {
        id: getId(
          emotion._id ?? emotion.id
        ),
        title: emotion.title,
      };
    }
  );
};

const transformBackendEntry = (
  entry: BackendDiaryEntry
): DiaryEntryDetail => {
  return {
    id: getId(entry._id ?? entry.id),
    title: entry.title ?? "",
    date:
      entry.date ??
      entry.createdAt ??
      new Date().toISOString(),
    description: entry.description ?? "",
    emotions: normalizeEmotions(
      entry.emotions
    ),
  };
};

const transformToListItem = (
  entry: BackendDiaryEntry
): DiaryListItem => {
  return transformBackendEntry(entry);
};

export const createDiaryEntry = async (
  payload: DiaryEntryPayload
): Promise<DiaryEntryDetail> => {
  const response = await nextServer.post(
    "/diaries",
    payload
  );

  const entry = unwrapEntry(response.data);

  return transformBackendEntry(entry);
};

export const fetchDiaries = async (): Promise<
  DiaryListItem[]
> => {
  const response =
    await nextServer.get("/diaries");

  const entries = unwrapList(response.data);

  return entries.map(transformToListItem);
};

export const updateDiaryEntry = async ({
  entryId,
  payload,
}: {
  entryId: string;
  payload: Partial<DiaryEntryPayload>;
}): Promise<DiaryEntryDetail> => {
  const response = await nextServer.patch(
    `/diaries/${entryId}`,
    payload
  );

  const entry = unwrapEntry(response.data);

  return transformBackendEntry(entry);
};

export const deleteDiaryEntry = async (
  entryId: string
): Promise<void> => {
  await nextServer.delete(
    `/diaries/${entryId}`
  );
};