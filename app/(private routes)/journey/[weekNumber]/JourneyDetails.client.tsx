"use client";

import css from "./JourneyDetails.module.css";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";

import BabyDevelopment from "@/components/JourneyComponents/BabyDevelopment/BabyDevelopment";
import MomState from "@/components/JourneyComponents/MomState/MomState";
import TasksReminderCard from "@/components/DashBoardPage/DashboardPage_main/TasksReminderCard/TasksReminderCard";
import BabyMomToggle from "@/components/JourneyComponents/BabyMomToggle/BabyMomToggle";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentWeek } from "@/lib/api/services/getCurrentWeek";

import { getBabyStateInfo, getMomStateInfo } from "@/lib/api/clientApi/weeks";
import Loader from "./Loader/Loader";

type Props = {
	weekNumber: number;
};

const JourneyDetails = ({ weekNumber }: Props) => {
	const [mode, setMode] = useState<"baby" | "mom">("baby");
	const user = useAuthStore((state) => state.user);
	const { currentWeek: userCurrentWeek } = getCurrentWeek(user);
	const selectedWeek = Math.min(weekNumber, userCurrentWeek);

	const { data: babyData, isError: babyError, isLoading: babyLoading } = useQuery({
		queryKey: ["baby", selectedWeek],
		queryFn: () => getBabyStateInfo(selectedWeek),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	const { data: momData, isError: momError, isLoading: momLoading } = useQuery({
		queryKey: ["mom", selectedWeek],
		queryFn: () => getMomStateInfo(selectedWeek),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	const hasError = babyError || momError;

	useEffect(() => {
		if (hasError) {
			toast.error("Failed to fetch data");
		}
	}, [hasError]);

	if (hasError) {
		return <p>Failed to fetch data</p>;
	}

	return (
		<section className={css.journeySection}>
			<BabyMomToggle
				mode={mode}
				setBabyMode={() => setMode("baby")}
				setMomMode={() => setMode("mom")}
			/>

			{babyLoading ? <Loader /> : mode === "baby" ?
				<BabyDevelopment data={babyData} />
				: <div className={css.momBodyChange}>
					<MomState data={momData} />
					<TasksReminderCard />
				</div>
			}

			{babyLoading || momLoading && <p className={css.loader}>Loading...</p>}
		</section>
	);
};

export default JourneyDetails;
