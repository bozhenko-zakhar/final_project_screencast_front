// components/DashboardPage/DashboardPage_main/DashboardPage_main.tsx

'use client'
import GreetingBlock from './GreetingBlock/GreetingBlock';
import TasksReminderCard from './TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from './FeelingCheckCard/FeelingCheckCard';
import styles from '../DashboardPage_main/DashboardPage_main.module.css';
import { DashBoardPage } from '../DashBoardPage';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentBabyWeek } from '@/app/lib/api/babyClientApi';

const DashboardPage = () => {
  const { data: babyWeek } = useQuery({
    queryKey: ['babyWeek'],
    queryFn: fetchCurrentBabyWeek,
  });

    return (
    <section className={styles.dashboard}>
      {/* Ліва частина: привітання +, наприклад, StatusBlock */}
      <div className={styles.leftColumn}>
        <GreetingBlock />
        {< DashBoardPage/>}
      </div>

      {/* Права колонка: Tasks + Feeling */}
      <div className={styles.rightColumn}>
        <TasksReminderCard babyImageUrl={babyWeek?.image}/>
        <FeelingCheckCard />
      </div>
    </section>
  );
};

export default DashboardPage;