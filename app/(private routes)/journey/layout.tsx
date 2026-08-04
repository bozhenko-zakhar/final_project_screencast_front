"use client"

import GreetingBlock from "@/components/DashBoard//GreetingBlock/GreetingBlock";
import css from "./layout.module.css"
import WeekSelector from "@/components/JourneyComponents/WeekSelector/WeekSelector";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentWeek } from "@/lib/api/services/getCurrentWeek";

type Props = {
	children: React.ReactNode;
}

export default function JourneyLayout({ children }: Props) {

	const user = useAuthStore((state) => state.user);
	const weekNumber = usePathname().split("/")[2]
	const { currentWeek: userCurrentWeek } = getCurrentWeek(user);
	const selectedWeek = Math.min(+weekNumber, userCurrentWeek);

	const router = useRouter();

	function handleWeekChange(week: number) {
		if (week > userCurrentWeek) return;
		router.replace(`/journey/${week}`);
	};

	return (
		<main className={css.main}>
			<GreetingBlock />

			<WeekSelector
				userCurrentWeek={userCurrentWeek}
				viewWeek={selectedWeek}
				onWeekChange={handleWeekChange}
			/>

			{children}
		</main>
	);
}