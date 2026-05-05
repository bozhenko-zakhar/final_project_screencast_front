// components/DashboardPage/DashboardPage_main/DashboardPage_main.tsx

"use client";
import GreetingBlock from "./GreetingBlock/GreetingBlock";
import TasksReminderCard from "./TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "./FeelingCheckCard/FeelingCheckCard";
import styles from "../DashboardPage_main/DashboardPage_main.module.css";

import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/clientApi/weeks";
import StatusBlock from "./StatusBlock/StatusBlock";
import BabyTodayCard from "./BabyTodayCard/BabyTodayCard";
import MomTipCard from "./MomTipCard/MomTipCard";
import { useParams } from "next/navigation";

const DashboardPage = () => {
	const { weekNumber } = useParams<{weekNumber: string}>();

  const { data: babyWeek } = useQuery({
    queryKey: ["babyWeek"],
    queryFn: () => fetchCurrentBabyWeek({weekNumber: weekNumber}),
  });

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
        <FeelingCheckCard />
      </div>
    </section>
  );
};

export default DashboardPage;
