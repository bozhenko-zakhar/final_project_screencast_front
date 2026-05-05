import { BabyWeek, BackendBabyWeek } from "@/types/baby";
import { nextServer } from "../api";
import { MomWeek } from "@/types/mom";

export const getMomStateInfo = async (weekNumber: number): Promise<MomWeek> => {
  const res = await nextServer.get<MomWeek>("/weeks/mom-state", {
    params: { weekNumber },
  });

  return res.data;
};

export const getBabyStateInfo = async (
  weekNumber: number,
): Promise<BabyWeek> => {
  const res = await nextServer.get<BabyWeek>("/weeks/baby-state", {
    params: { weekNumber },
  });

  return res.data;
};

type WeekParams = {
  weekNumber: number;
};

export const fetchCurrentBabyWeek = async ({
  weekNumber,
}: WeekParams): Promise<BabyWeek> => {
  const weekNumberQuery = weekNumber ? `weekNumber=${weekNumber}` : "";
  // Бекенд повертає масив тижнів
  const res = await nextServer.get<BabyWeek>(
    `/weeks/baby-state?${weekNumberQuery}`, // ← твій реальний шлях, який повертає масив
  );

  const data = res.data;

  // Мапимо структуру бекенду (_id.$oid → id, решта поля 1:1)
  return data; /*{
    id: data.id,
    analogy: data.analogy,
    weekNumber: data.weekNumber,
    babySize: data.babySize,
    babyWeight: data.babyWeight,
    image: data.image,
    babyActivity: data.babyActivity,
    babyDevelopment: data.babyDevelopment,
    interestingFact: data.interestingFact,
    momDailyTips: data.momDailyTips,
	};*/
};

export const fetchCurrentMomWeek = async ({
  weekNumber,
}: WeekParams): Promise<MomWeek> => {
  const weekNumberQuery = weekNumber ? `weekNumber=${weekNumber}` : "";

  const res = await nextServer.get(`/weeks/mom-state?${weekNumberQuery}`);

  const currentWeek = res.data[0].weekNumber;

  const data = res.data[currentWeek];

  return data;
};

export const fetchPublicWeeks = async () => {
  const res = await nextServer.get("/weeks/public");
  return res.data;
};

export const fetchPrivateWeeks = async () => {
  const res = await nextServer.get("/weeks/private");
  return res.data;
};
