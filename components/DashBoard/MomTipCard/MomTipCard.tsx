"use client";

import css from "./MomTipCard.module.css";
import { WeeksResponse } from "@/lib/api/clientApi/weeks";

type Props = {
	data: WeeksResponse | undefined
};

const MomTipCard = ({ data }: Props) => {
  function caclulateTodaysDay(): number {
    if (!data) return 0;
    const tipsCount = data.babyState.momDailyTips.length;
    return data.daysLeft % tipsCount;
  }

  return (
    <div className={css.advicesForMom}>
      <h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
      <p className={css.momDailyTips}>
        {data?.babyState.momDailyTips[caclulateTodaysDay()]}
      </p>
    </div>
  );
};

export default MomTipCard;
