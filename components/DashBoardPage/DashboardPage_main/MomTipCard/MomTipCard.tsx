import css from "./MomTipCard.module.css";

import * as babyStates from "@/lehlehka.baby_states.json";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";

const MomTipCard = () => {
  const data = babyStates[0];

  return (
    <section className={`${cardStyles.card}  ${css.advicesForMom}`}>
      <div className={css.advicesForMomWrap}>
        <h3 className={css.babyContainerHeaderline}>Порада для мами</h3>
        <p className={css.momDailyTips}>{data.momDailyTips}</p>
      </div>
    </section>
  );
};

export default MomTipCard;
