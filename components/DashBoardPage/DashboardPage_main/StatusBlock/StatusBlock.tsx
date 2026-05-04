import { useQuery } from "@tanstack/react-query";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/weeks/babyClientApi";
import { fetchCurrentBabyWeek, fetchPrivateWeeks } from "@/app/lib/api/babyClientApi";
import { useAuthStore } from "@/lib/store/authStore";



const StatusBlock = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: dataWeeks } = useQuery({
    queryKey: ["dataWeeks"],
    queryFn: fetchCurrentBabyWeek,
    enabled: isAuthenticated,
  });

  const {
    data: daysLeft,
  } = useQuery({
    queryKey: ["daysLeft"],
    queryFn: fetchPrivateWeeks,
    enabled: isAuthenticated,
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
