"use client"

import css from "./MomTipCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

type Props = {
	token: string
}

const MomTipCard = ({token}: Props) => {
  const {
    data: babyData,
    // isLoading: babyLoading,
    // isError: babyError,
  } = useQuery({
    queryKey: ["baby"],
    queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
    placeholderData: keepPreviousData,
	});
	
	function caclulateTodaysDay(): number {
		if (babyData?.daysLeft && babyData?.babyState.weekNumber)
			return Math.trunc(babyData?.daysLeft % babyData?.babyState.weekNumber);
		else return 0
	}

  return (
		<div className={css.advicesForMom}>
			<h3 className={css.babyContainerHeaderline}>Порада для мами </h3>
			<p className={css.momDailyTips}>{babyData?.babyState.momDailyTips[caclulateTodaysDay()]}</p>
		</div>
  );
};

export default MomTipCard;
