export const calculatePregnancyWeek = (dueDate: string | undefined): number => {
  if (!dueDate) return 1;

  const now = new Date();
  const due = new Date(dueDate);
  
  const diffInMs = due.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  const weeksRemaining = Math.ceil(diffInDays / 7);
  const currentWeek = 40 - weeksRemaining;
  
  return Math.min(Math.max(currentWeek, 1), 40);
};