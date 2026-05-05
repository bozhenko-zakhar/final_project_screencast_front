"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { getDiaryEntry } from "@/lib/api/clientApi/diaries";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryEntryPage = ({
	params,
}: {
	params: Promise<{ entryId: string }>;
}) => {
	const { entryId } = use(params);

	const { data: entry = null, isLoading, error } = useQuery({
		queryKey: ["diaryEntry", entryId],
		queryFn: () => getDiaryEntry(entryId),
		enabled: !!entryId,
	});

	return (
		<div className={css.container}>
			<div className={css.greetingSection}>
				<GreetingBlock />
			</div>

			<div className={css.content}>
				{isLoading ? (
					<div className={css.loading}>Завантаження запису...</div>
				) : error ? (
					<div className={css.error}>Помилка завантаження запису</div>
				) : (
					<DiaryEntryDetails entry={entry} />
				)}
			</div>
		</div>
	);
};

export default DiaryEntryPage;
