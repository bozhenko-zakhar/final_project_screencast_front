"use client";

import { use, useEffect } from "react";
import css from "./page.module.css";
import { useDiaryStore } from "@/lib/store/diaryStore";
import DiaryEntryDetails from "@/components/DiaryList/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";

const DiaryEntryPage = ({
	params,
}: {
	params: Promise<{ entryId: string }>;
}) => {
	const { entryId } = use(params);
	const { selectEntry, getSelectedEntry, fetchEntries, isLoading, error } = useDiaryStore();

	useEffect(() => {
		selectEntry(entryId);
		fetchEntries(); // Ensure data is loaded
	}, [entryId, selectEntry, fetchEntries]);

	const entry = getSelectedEntry();

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
