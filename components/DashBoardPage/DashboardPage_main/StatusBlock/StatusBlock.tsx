"use client";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useWeekStore } from "@/lib/store/babyDataStore";

const StatusBlock = () => {
  const weekNumber = useWeekStore((state) => state.babyState);
  const daysLeft = useWeekStore((state) => state.daysLeft);

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{weekNumber?.weekNumber}</h3>
      </div>

      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~{daysLeft}</h3>
      </div>
    </section>
  );
};

export default StatusBlock;
