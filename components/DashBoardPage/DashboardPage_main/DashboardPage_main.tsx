// components/DashboardPage/DashboardPage_main/DashboardPage_main.tsx

'use client';

import GreetingBlock from './GreetingBlock/GreetingBlock';
import TasksReminderCard from './TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from './FeelingCheckCard/FeelingCheckCard';
import StatusBlock from './StatusBlock/StatusBlock';
import BabyTodayCard from './BabyTodayCard/BabyTodayCard';
import MomTipCard from './MomTipCard/MomTipCard';

import styles from './DashboardPage_main.module.css';

const DashboardPage = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.leftColumn}>
        <GreetingBlock />
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
      </div>

      <div className={styles.rightColumn}>
        <TasksReminderCard />
        <FeelingCheckCard />
      </div>
    </section>
  );
};

export default DashboardPage;