'use client';

import { useAuthStore } from '@/lib/store/authStore';
import styles from './GreetingBlock.module.css';
import cardStyles from '../DashboardPage/DashboardPage.module.css';

const GreetingBlock = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const userName = user?.username;

  const greetingText = isAuthenticated
    ? `Доброго ранку, ${userName}!`
    : 'Вітаємо в Лелеці!';

  return (
    <section
          className={`${styles.greeting}`}
    >
      <h1 className={styles.title}>{greetingText}</h1>
    </section>
  );
};

export default GreetingBlock;