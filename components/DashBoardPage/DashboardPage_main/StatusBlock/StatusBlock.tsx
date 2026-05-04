import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/weeks/babyClientApi";
import { useAuthStore } from "@/lib/store/authStore";

const StatusBlock = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: dataWeeks } = useQuery({
    queryKey: ["dataWeeks"],
    queryFn: fetchCurrentBabyWeek,
    enabled:isAuthenticated
  });

  return (
    <section className={css.daysCountWrapper}>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Тиждень</p>
        <h3 className={css.days}>{dataWeeks?.weekNumber}</h3>
      </div>
      <div className={`${cardStyles.card} ${css.weeks}`}>
        <p className={css.title}>Днів до зустрічі</p>
        <h3 className={css.days}>~165</h3>
      </div>
    </section>
  );
};

export default StatusBlock;
