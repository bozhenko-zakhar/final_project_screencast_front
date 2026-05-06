"use client";

import css from "./MomTipCard.module.css";

import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useBabyDataStore } from "@/lib/store/babyDataStore";

const MomTipCard = () => {
  const data = useBabyDataStore((state) => state.babyData);

  return (
    <section className={`${cardStyles.card}  ${css.advicesForMom}`}>
      <div className={css.advicesForMomWrap}>
        <h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
        <p className={css.momDailyTips}>{data?.momDailyTips?.[0]}</p>
      </div>
    </section>
  );
};

export default MomTipCard;
