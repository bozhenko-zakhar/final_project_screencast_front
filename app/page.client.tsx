"use client";

import GreetingBlock from "@/components/DashBoard/GreetingBlock/GreetingBlock";
import TasksReminderCard from "@/components/DashBoard/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/DashBoard/FeelingCheckCard/FeelingCheckCard";
import StatusBlock from "@/components/DashBoard/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/DashBoard/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/DashBoard/MomTipCard/MomTipCard";

import styles from "./page.client.module.css";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
	token: string
}

const DashboardClientPage = ({ token }: Props) => {
	const { data: babyData } = useQuery({
		queryKey: ["baby"],
		queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	return (
		<main className={styles.dashboard}>
			<div className={styles.greetingWrapper}>
				<GreetingBlock />
			</div>

			<div className={styles.leftColumn}>
				<StatusBlock data={babyData} />
				<BabyTodayCard data={babyData} />
				<MomTipCard data={babyData} />
			</div>

			<div className={styles.rightColumn}>
				<TasksReminderCard />
				<FeelingCheckCard />
			</div>
		</main>
	);
};

export default DashboardClientPage;