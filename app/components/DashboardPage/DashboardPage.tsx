// components/DashboardPage/DashboardPage.tsx
import GreetingBlock from '../GreetingBlock/GreetingBlock';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '../FeelingCheckCard/FeelingCheckCard';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
    return (
    <section className={styles.dashboard}>
      {/* Ліва частина: привітання +, наприклад, StatusBlock */}
      <div className={styles.leftColumn}>
        <GreetingBlock />
        {/* Тут потім додадуть StatusBlock, BabyTodayCard, MomTipCard */}
      </div>

      {/* Права колонка: Tasks + Feeling */}
      <div className={styles.rightColumn}>
        <TasksReminderCard />
        <FeelingCheckCard />
      </div>
    </section>
   
  );
};

export default DashboardPage;