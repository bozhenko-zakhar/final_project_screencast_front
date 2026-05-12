import { User } from "@/types/user";

export const getCurrentWeek = (user: User | Partial<User> | null) => {
  if (!user?.dueDate) {
    return {
      currentWeek: 1,
      daysLeft: 273,
    };
  }

  const dueDate = new Date(user.dueDate);

  const now = new Date();

  const daysLeft = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const currentWeek = Math.min(40, Math.max(1, 40 - Math.floor(daysLeft / 7)));

  return currentWeek;
};
