// components/DashboardPage/DashboardPage_main/DashboardPage_main.tsx

"use client";
import GreetingBlock from "./GreetingBlock/GreetingBlock";
import TasksReminderCard from "./TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "./FeelingCheckCard/FeelingCheckCard";
import styles from "../DashboardPage_main/DashboardPage_main.module.css";

import { useQuery } from "@tanstack/react-query";
import { getBabyStateInfo } from "@/lib/api/clientApi/weeks";
import StatusBlock from "./StatusBlock/StatusBlock";
import BabyTodayCard from "./BabyTodayCard/BabyTodayCard";
import MomTipCard from "./MomTipCard/MomTipCard";
import { useParams } from "next/navigation";
import { useBabyDataStore } from "@/lib/store/babyDataStore";
import { useEffect } from "react";

const DashboardPage = () => {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const fetchData = useBabyDataStore((state) => state.fetchData);

  useEffect(() => {
    fetchData(10);
  }, []);

  // const { weekNumber } = useParams<{weekNumber: string}>();

  // const { data: babyWeek } = useQuery({
  //   queryKey: ["babyWeek"],
  //   queryFn: () => getBabyStateInfo(1),
  // });

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
