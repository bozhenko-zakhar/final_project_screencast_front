import axios from "axios";

export interface Emotion {
  _id: {
    $oid: string;
  };
  title: string;
}

export interface DiaryEntry {
  title: string;
  description: string;
  emotions: string[]; 
  date: string;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchEmotions = async (): Promise<Emotion[]> => {
  const { data } = await instance.get("/emotions");
  return data;
};

export const createDiaryEntry = async (payload: DiaryEntry): Promise<void> => {
  await instance.post("/diary", payload);
};

export default instance;