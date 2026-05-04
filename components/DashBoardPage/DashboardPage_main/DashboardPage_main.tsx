// components/DashboardPage/DashboardPage_main/DashboardPage_main.tsx

"use client";
import GreetingBlock from "../GreetingBlock/GreetingBlock";
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "../FeelingCheckCard/FeelingCheckCard";
import styles from "../DashboardPage_main/DashboardPage_main.module.css";

import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/app/lib/api/babyClientApi";
import StatusBlock from "../StatusBlock/StatusBlock";
import BabyTodayCard from "../BabyTodayCard/BabyTodayCard";
import MomTipCard from "../MomTipCard/MomTipCard";

const DashboardPage = () => {

  return (
    <section className={styles.dashboard}>
      {/* Ліва частина: привітання +, наприклад, StatusBlock */}
      <div className={styles.leftColumn}>
        <GreetingBlock />
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
      </div>

      {/* Права колонка: Tasks + Feeling */}
      <div className={styles.rightColumn}>
        <TasksReminderCard />
          <FeelingCheckCard /> {/* перевірити */}
      </div>
    </section>
  );
};

export default DashboardPage;
