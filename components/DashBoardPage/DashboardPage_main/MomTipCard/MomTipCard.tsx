"use client";

import css from "./MomTipCard.module.css";

import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/weeks/babyClientApi";
import { useAuthStore } from "@/lib/store/authStore";

const MomTipCard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: babyWeek } = useQuery({
    queryKey: ["babyWeek"],
    queryFn: fetchCurrentBabyWeek,
    enabled: isAuthenticated
  });

  return (
    <section className={`${cardStyles.card}  ${css.advicesForMom}`}>
      <div className={css.advicesForMomWrap}>
        <h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
        <p className={css.momDailyTips}>{babyWeek?.momDailyTips}</p>
      </div>
    </section>
  );
};

export default MomTipCard;
