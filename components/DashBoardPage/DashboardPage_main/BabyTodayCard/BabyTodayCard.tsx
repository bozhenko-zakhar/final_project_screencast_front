import css from "./BabyTodayCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentBabyWeek } from "@/lib/api/weeks/babyClientApi";
import { useAuthStore } from "@/lib/store/authStore";

const BabyTodayCard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data:babyData } = useQuery({
    queryKey: ["babyWeek"],
    queryFn: fetchCurrentBabyWeek,
    enabled: isAuthenticated,
  });


  return (
    <section className={`${cardStyles.card} ${css.descriptionAboutBaby}`}>
      <div className={css.aboutBabyContainer}>
        <h2 className={css.babyContainerHeaderline}>Малюк сьогодні</h2>
        <div className={css.babyDescriptionContainer}>
          <img
            className={css.babyContainerImg}
            src={babyData?.image}
            alt={babyData?.image}
          />
          <div className={css.babyDescription}>
            <p className={css.titlesOfBabyToday}>
              Розмір:
              <span className={css.babyDescriptionText}>{babyData?.babySize}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Вага:
              <span className={css.babyDescriptionText}>{babyData?.babyWeight}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Активність:
              <span className={css.babyDescriptionText}>
                {babyData?.babyDevelopment}
              </span>
            </p>
          </div>
        </div>
        <div className={css.description}>
          <p className={css.babyDescriptionText}>{babyData?.interestingFact}</p>
        </div>
      </div>
    </section>
  );
};

export default BabyTodayCard;
