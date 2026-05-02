export interface BackendBabyWeek {
  _id: { $oid: string };
  analogy: string | null;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}
export interface BabyWeek {
  id: string;                // мапимо з _id.$oid
  analogy: string | null;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;             // URL для картинки малюка
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}