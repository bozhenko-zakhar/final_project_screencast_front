import { BabyWeek } from "@/types/baby";
import { nextServer } from "../api";
import { MomWeek } from "@/types/mom";

export type WeeksResponse = {
  daysLeft: number;
  babyState: BabyWeek;
};

type BabyStateResponse = {
  babyState: BabyWeek;
};

type MomStateResponse = {
  momState: MomWeek;
};

export const getMomStateInfo = async (weekNumber: number): Promise<MomWeek> => {
  const res = await nextServer.get<MomStateResponse>("/weeks/mom-state", {
    params: { weekNumber },
    metadata: {
      showGlobalLoader: false,
    },
  });

  return res.data.momState;
};

export const getBabyStateInfo = async (
  weekNumber: number,
): Promise<BabyWeek> => {
  const res = await nextServer.get<BabyStateResponse>("/weeks/baby-state", {
    params: { weekNumber },
     metadata: {
      showGlobalLoader: false,
    },
  });

  return res.data.babyState;
};

export const fetchPublicWeeks = async (): Promise<WeeksResponse> => {
  const res = await nextServer.get<WeeksResponse>("/weeks/public");
  return res.data;
};

export const fetchPrivateWeeks = async (): Promise<WeeksResponse> => {
  const res = await nextServer.get<WeeksResponse>("/weeks/private");
  return res.data;
};
