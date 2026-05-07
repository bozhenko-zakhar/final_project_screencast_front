"use client";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useWeekStore } from "@/lib/store/babyDataStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

const StatusBlock = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	
  const {
    data: babyData,
    // isLoading: babyLoading,
    // isError: babyError,
  } = useQuery({
    queryKey: ["baby"],
    queryFn: isAuthenticated ? fetchPrivateWeeks : fetchPublicWeeks,
    placeholderData: keepPreviousData,
  });

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{babyData?.babyState.weekNumber}</h3>
      </div>

      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~{babyData?.daysLeft}</h3>
      </div>
    </section>
  );
};

export default StatusBlock;