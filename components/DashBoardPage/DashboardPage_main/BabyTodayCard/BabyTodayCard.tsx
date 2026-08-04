"use client";

import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

import css from "./BabyTodayCard.module.css";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  token: string;
};

const BabyTodayCard = ({ token }: Props) => {
  const {user} = useAuthStore();
  
  console.log(token);
  const {
    data: babyData,
  } = useQuery({
    queryKey: ["baby"],
    queryFn: user ? fetchPrivateWeeks : fetchPublicWeeks,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.aboutBabyContainer}>
      <h2 className={css.babyHeaderline}>Малюк сьогодні</h2>

      <div className={css.CharacteristicsWrapper}>
        <Image
          className={css.babyImg}
          src={babyData?.babyState?.image ?? "/image/default-week.jpeg"}
          alt={babyData?.babyState?.analogy ?? "Calendar entry holds a pencil"}
          width={287}
          height={216}
        />
        {babyData && (
          <div>
            <p className={css.titlesOfBabyToday}>
              Розмір:
              <span className={css.babyDescriptionText}>
                {babyData?.babyState?.babySize}
              </span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Вага:
              <span className={css.babyDescriptionText}>
                {babyData?.babyState?.babyWeight}
              </span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Активність:
              <span className={css.babyDescriptionText}>
                {babyData?.babyState?.babyActivity}
              </span>
            </p>
          </div>
        )}
      </div>

      <p className={css.babyDevelopment}>
        {babyData?.babyState.babyDevelopment}
      </p>
    </div>
  );
};

export default BabyTodayCard;
