import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useBabyDataStore } from "@/lib/store/babyDataStore";

const StatusBlock = () => {
  const dataWeeks = useBabyDataStore((state) => state.babyData);
  const daysDisplay = useBabyDataStore((state) => state.privateData?.daysLeft);

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{dataWeeks?.weekNumber}</h3>
      </div>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~{daysDisplay}</h3>
      </div>
    </section>
  );
};

export default StatusBlock;
