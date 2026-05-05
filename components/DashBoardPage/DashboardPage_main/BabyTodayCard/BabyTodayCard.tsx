import css from "./BabyTodayCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBabyStateInfo } from "@/lib/api/clientApi/weeks";
import { useAuthStore } from "@/lib/store/authStore";
import { useParams } from "next/navigation";

const BabyTodayCard = () => {
	const { data:babyData } = useQuery({
    queryKey: ["babyWeek"],
    queryFn: () => getBabyStateInfo(1)
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
                {" " + babyData?.babyDevelopment}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BabyTodayCard;
