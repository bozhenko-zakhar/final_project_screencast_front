"use client";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

type Props = {
	token: string
}

const StatusBlock = ({token}: Props) => {
  const {
    data: babyData
  } = useQuery({
    queryKey: ["baby"],
    queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{babyData?.babyState.weekNumber}</h3>
      </div>

      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>{babyData?.daysLeft && `~${babyData?.daysLeft}`}</h3>
      </div>
    </div>
  );
};

export default StatusBlock;