export type MongoId = string | { $oid: string };

export interface EmotionItem {
  _id?: MongoId;
  id?: MongoId;
  title: string;
}

export interface DiaryEntryPayload {
  title: string;
  description: string;
  emotions: string[];
  date?: string;
}

export interface BackendDiaryEntry {
  _id?: MongoId;
  id?: MongoId;
  userId?: string;
  title: string;
  description: string;
  emotions?: EmotionItem[] | string[];
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface DiaryListItem {
  id: string;
  title: string;
  date: string;
  description: string;
  emotions: Array<{
    id: string;
    title: string;
  }>;
}

export type DiaryEntryDetail = DiaryListItem;

export interface DiaryEntryFormValues {
  title: string;
  description: string;
  emotions: string[];
}