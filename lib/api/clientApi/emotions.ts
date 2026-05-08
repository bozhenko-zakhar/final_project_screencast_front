import { nextServer } from "../api";

export interface Emotion {
  _id: string | { $oid: string };
  title: string;
}

type EmotionsResponse =
  | Emotion[]
  | {
      data?: Emotion[];
      emotions?: Emotion[];
      result?: Emotion[];
    };

export const getEmotionId = (emotion: Emotion): string => {
  return typeof emotion._id === "string" ? emotion._id : emotion._id.$oid;
};

export const fetchEmotions = async (): Promise<Emotion[]> => {
  const { data } = await nextServer.get<EmotionsResponse>("/emotions");

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (Array.isArray(data.emotions)) {
    return data.emotions;
  }

  if (Array.isArray(data.result)) {
    return data.result;
  }

  return [];
};