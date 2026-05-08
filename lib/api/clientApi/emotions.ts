import { nextServer } from "../api";

export interface Emotion {
  _id: {
    $oid: string;
  };
  title: string;
}

export const fetchEmotions = async (): Promise<Emotion[]> => {
  const { data } = await nextServer.get("/emotions");
  return data;
};