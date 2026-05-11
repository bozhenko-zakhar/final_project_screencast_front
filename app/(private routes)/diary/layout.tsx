import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import css from "./layout.module.css"

interface DiaryLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
}

export default function DiaryLayout({
  children,
  details,
}: DiaryLayoutProps) {
  return (
		<>
			<div className={css.greeting_container}>
      	<GreetingBlock />
			</div>
			<div className={css.diary_container}>
				
				<div className={css.children_container}>
					{children}
				</div>

				<aside className={`${css.details_container} ${css.is_desktop}`}>
					{details}
				</aside>
			</div>
		</>
  );
}