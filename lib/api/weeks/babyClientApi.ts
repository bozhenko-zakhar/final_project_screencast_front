// app/lib/api/babyClientApi.ts
import { nextServer } from '../api';
import type { BackendBabyWeek, BabyWeek } from '@/types/baby';

export const fetchCurrentBabyWeek = async (): Promise<BabyWeek> => {

  localStorage.setItem("token", "demo_user_token");
  // Бекенд повертає масив тижнів
  const res = await nextServer.get<BackendBabyWeek[]>(
    "/weeks/baby-state",// ← твій реальний шлях, який повертає масив
    
  );


  // Якщо не знаємо currentWeek, беремо перший елемент масиву як поточний тиждень
  const current = res.data[0];

  if (!current) {3
    throw new Error('No baby week data received');
  } //це не треба

  // Мапимо структуру бекенду (_id.$oid → id, решта поля 1:1)
  return {
    id: current._id.$oid,
    analogy: current.analogy,
    weekNumber: current.weekNumber,
    babySize: current.babySize,
    babyWeight: current.babyWeight,
    image: current.image,
    babyActivity: current.babyActivity,
    babyDevelopment: current.babyDevelopment,
    interestingFact: current.interestingFact,
    momDailyTips: current.momDailyTips,
  };
};

export const fetchPrivateWeeks = async () => {
  const res = await nextServer.get("/weeks/private");
  return res.data;
};
