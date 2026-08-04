"use client";

import css from "./StatusBlock.module.css";
import cardStyles from "../../../app/page.client.module.css";
import { WeeksResponse } from "@/lib/api/clientApi/weeks";

type Props = {
	data: WeeksResponse | undefined
};

const StatusBlock = ({data}: Props) => {
  return (
    <div className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{data?.babyState.weekNumber}</h3>
      </div>

      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>
          {data?.daysLeft && `~${data?.daysLeft}`}
        </h3>
      </div>
    </div>
  );
};

export default StatusBlock;
