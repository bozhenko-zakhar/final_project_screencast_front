"use client";

import css from "./MomTipCard.module.css";
// import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  token: string;
};

const MomTipCard = ({ token }: Props) => {
  const {user} = useAuthStore();
  const {
    data: babyData,
    // isLoading: babyLoading,
    // isError: babyError,
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
