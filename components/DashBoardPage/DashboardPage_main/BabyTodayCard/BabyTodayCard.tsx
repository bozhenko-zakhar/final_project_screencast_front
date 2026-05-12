"use client"

import css from "./BabyTodayCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
	token: string
}

const BabyTodayCard = ({token}: Props) => {
  const {
    data: babyData,
    // isLoading: babyLoading,
    // isError: babyError,
  } = useQuery({
    queryKey: ["baby"],
    queryFn: token ? fetchPrivateWeeks : fetchPublicWeeks,
    placeholderData: keepPreviousData,
  });

  return (
    <section className={`${cardStyles.card} ${css.descriptionAboutBaby}`}>
      <div className={css.aboutBabyContainer}>
        <h2 className={css.babyContainerHeaderline}>Малюк сьогодні</h2>
        <div className={css.babyDescriptionContainer}>
          <img
            className={css.babyContainerImg}
            src={babyData?.babyState.image}
            alt={babyData?.babyState.image}
          />
          <div className={css.babyDescription}>
            <p className={css.titlesOfBabyToday}>
              Розмір:
              <span className={css.babyDescriptionText}>{babyData?.babyState.babySize}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Вага:
              <span className={css.babyDescriptionText}>{babyData?.babyState.babyWeight}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Активність:
              <span className={css.babyDescriptionText}>
                {babyData?.babyState.babyDevelopment}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BabyTodayCard;
