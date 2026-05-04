export interface BabyState {
  _id: string;
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

export interface PregnancyInfo {
  currentWeek: number;
  babyState: BabyState;
  daysLeft: number;
}
