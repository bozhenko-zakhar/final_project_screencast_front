'use client';

import { useRouter } from 'next/navigation';

import styles from './TasksReminderCard.module.css';
import cardStyles from '../DashboardPage/DashboardPage.module.css';

const TasksReminderCard = () => {
  const router = useRouter();

  const handleCreateTaskClick = () => {
    // гість → ведемо на сторінку реєстрації
    router.push('/auth/register');
  };

  return (
    <section
      className={`${cardStyles.card} ${cardStyles.cardFixedHeight} ${styles.tasks}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleCreateTaskClick}
          aria-label="Створити завдання"
        >
          +
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.noTasksTitle}>Наразі немає жодних завдань</p>
        <p className={styles.noTasksText}>Створіть мершій нове завдання!</p>

        <button
          type="button"
          className={styles.createButton}
          onClick={handleCreateTaskClick}
        >
          Створити завдання
        </button>
      </div>
    </section>
  );
};

export default TasksReminderCard;