
"use client";

import { useEffect } from "react";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
	userCurrentWeek: number;
	viewWeek: number;
	onWeekChange: (week: number) => void;
};

export default function WeekSelector({
	userCurrentWeek,
	viewWeek,
	onWeekChange,
}: WeekSelectorProps) {

	const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

	//  Active week
	const activeWeek = viewWeek ?? userCurrentWeek;

	//  Center week
	useEffect(() => {
		const element = document.querySelector(
			`[data-week="${activeWeek}"]`
		) as HTMLButtonElement | null;

		if (!element) return;

		requestAnimationFrame(() => {
			element.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			});
		});
	}, [activeWeek]);

	return (
		<div className={css.wrapper}>
			{weeks.map((week) => {
				const isCurrentUserWeek = week === userCurrentWeek;

				const isActive = week === activeWeek;

				const isFuture = week > userCurrentWeek;

				const isClickable = week <= userCurrentWeek;

				return (
					<button
						key={week}
						data-week={week}
						disabled={!isClickable}
						className={`
              ${css.button}
              ${isActive ? css.active : ""}
              ${isCurrentUserWeek ? css.currentWeek : ""}
              ${isFuture ? css.disabled : ""}
            `}
						onClick={() => {
							if (!isClickable) return;

							if (week === activeWeek) return;

							onWeekChange(week);
						}}
					>
						<span className={css.number}>{week}</span>
						Тиждень
					</button>
				);
			})}
		</div>
	);
}




