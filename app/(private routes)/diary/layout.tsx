"use client"

import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import css from "./layout.module.css"
import { useDiaryStore } from "@/lib/store/diaryStore";

interface DiaryLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
}

export default function DiaryLayout({
  children,
  details,
}: DiaryLayoutProps) {
	const isDiaryEditing = useDiaryStore(state => state.isDiaryEditing);
  return (
		<main>
			<div className={css.greeting_container}>
      	<GreetingBlock />
			</div>
			<div className={css.diary_container}>
				
				{
					!isDiaryEditing && 
					<div className={css.children_container}>
						{children}
					</div>
				}
				
				<aside className={`${css.details_container} ${css.is_desktop}`}>
					{details}
				</aside>
			</div>
		</main>
  );
}