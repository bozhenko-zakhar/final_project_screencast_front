'use client';

import css from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';

type UserForTitle = {
  name?: string | null;
  email?: string | null;
};

function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 6) return 'Доброї ночі';
  if (hour < 12) return 'Доброго ранку';
  if (hour < 18) return 'Доброго дня';
  
  return 'Доброго вечора';
}

function GreetingBlock() {
  const user = useAuthStore((state) => state.user) as UserForTitle | null;

  const userName = user?.name || 'Мамо';

  const greeting = `${getGreeting()}, ${userName}!`;

  return <h1 className={css.title}>{greeting}</h1>;
}

export default GreetingBlock;
