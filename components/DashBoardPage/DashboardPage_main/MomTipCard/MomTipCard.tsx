"use client";

import css from "./MomTipCard.module.css";

import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";
import { useParams } from "next/navigation";

const MomTipCard = () => {
	const { weekNumber } = useParams<{weekNumber: string}>();

  const { data: babyWeek } = useQuery({
    queryKey: ["babyWeek"],
    queryFn: () => fetchCurrentBabyWeek({weekNumber: weekNumber})
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
