import { useQuery } from "@tanstack/react-query";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { fetchCurrentBabyWeek, fetchPrivateWeeks } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";
import { useParams } from "next/navigation";



const StatusBlock = () => {
	const { weekNumber } = useParams<{weekNumber: string}>();

  const { data: dataWeeks } = useQuery({
    queryKey: ["dataWeeks"],
    queryFn: () => fetchCurrentBabyWeek({weekNumber: weekNumber}),
  });

  const {
    data: daysLeft,
  } = useQuery({
    queryKey: ["daysLeft"],
    queryFn: fetchPrivateWeeks,
    select: (response) => response?.daysLeft,
  });

  const daysDisplay = daysLeft !== undefined ? daysLeft : "...";

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{dataWeeks?.weekNumber}</h3>
      </div>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~{daysDisplay}</h3>
      </div>
    </section>
  );
};

export default StatusBlock;
