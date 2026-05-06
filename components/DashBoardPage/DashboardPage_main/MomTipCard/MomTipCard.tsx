"use client";

import css from "./MomTipCard.module.css";

import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPrivateWeeks } from "@/lib/api/clientApi/weeks";

const MomTipCard = () => {
	const { data } = useQuery({
    queryKey: ["babyWeek", "MomTipCard"], // через те, що запитів багато, ключі теж треба різні. Треба зробити так, щоби був тільки один запит на всю сторінку	
    queryFn: fetchPrivateWeeks
  });

  return (
    <section className={`${cardStyles.card}  ${css.advicesForMom}`}>
      <div className={css.advicesForMomWrap}>
        <h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
        <p className={css.momDailyTips}>{data?.babyState?.momDailyTips[0]}</p>
      </div>
    </section>
  );
};

export default MomTipCard;
