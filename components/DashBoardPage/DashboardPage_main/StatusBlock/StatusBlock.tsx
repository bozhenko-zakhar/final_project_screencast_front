import { useQuery } from "@tanstack/react-query";

import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { fetchPrivateWeeks } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";

const StatusBlock = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data } = useQuery({
    queryKey: ["privateWeeks"],
    queryFn: fetchPrivateWeeks,
    enabled: isAuthenticated,
  });

  const weekDisplay = data?.babyState?.weekNumber ?? "...";
  const daysDisplay = data?.daysLeft ?? "...";

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{weekDisplay}</h3>
      </div>

      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~{daysDisplay}</h3>
      </div>
    </section>
  );
};

export default StatusBlock;