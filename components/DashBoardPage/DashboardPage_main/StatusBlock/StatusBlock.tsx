import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import * as babyStates from "@/lehlehka.baby_states.json";

const StatusBlock = () => {
  const data = babyStates[0];

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{data.weekNumber}</h3>
      </div>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~165</h3>
      </div>
    </section>
  );
};

export default StatusBlock;