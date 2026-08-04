"use client";

import css from "./MomTipCard.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

type Props = {
  token: string;
};

const MomTipCard = ({ token }: Props) => {
  const {
    data: babyData
  } = useQuery({
    queryKey: ["baby"],
    queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  function caclulateTodaysDay(): number {
    if (!babyData) return 0;
    const tipsCount = babyData.babyState.momDailyTips.length;
    return babyData.daysLeft % tipsCount;
  }

  return (
    <div className={css.advicesForMom}>
      <h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
      <p className={css.momDailyTips}>
        {babyData?.babyState.momDailyTips[caclulateTodaysDay()]}
      </p>
    </div>
  );
};

export default MomTipCard;
