import css from "./StatusBlock.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useBabyDataStore } from "@/lib/store/babyDataStore";
import { useAuthStore } from "@/lib/store/authStore";

const StatusBlock = () => {
  const dataWeeks = useBabyDataStore((state) => state.babyData);
  const privateData = useBabyDataStore((state) => state.privateData);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <section className={css.daysCountWrapper}>
      {isAuthenticated ? (
        <>
          <div className={`${cardStyles.card} ${css.weeks}`}>
            <p className={css.title}>Тиждень</p>
            <h3 className={css.days}>{dataWeeks?.weekNumber}</h3>
          </div>

          <div className={`${cardStyles.card} ${css.weeks}`}>
            <p className={css.title}>Днів до зустрічі</p>
            <h3 className={css.days}>~{privateData?.daysLeft}</h3>
          </div>
        </>
      ) : (
        <>
          <div className={`${cardStyles.card} ${css.weeks}`}>
            <p className={css.title}>Тиждень</p>
            <h3 className={css.days}>{dataWeeks?.weekNumber }</h3>
          </div>
        </>
      )}
    </section>
  );
};

export default StatusBlock;
