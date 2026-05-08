"use client";

import GreetingBlock from "./GreetingBlock/GreetingBlock";
import TasksReminderCard from "./TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "./FeelingCheckCard/FeelingCheckCard";
import StatusBlock from "./StatusBlock/StatusBlock";
import BabyTodayCard from "./BabyTodayCard/BabyTodayCard";
import MomTipCard from "./MomTipCard/MomTipCard";
import { keepPreviousData, QueryClient, useQuery, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

import styles from "./DashboardPage_main.module.css";

const DashboardPage = () => {
	
  return (
    <section className={styles.dashboard}>
      <div className={styles.greetingWrapper}>
        <GreetingBlock />
      </div>

      <div className={styles.leftColumn}>
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