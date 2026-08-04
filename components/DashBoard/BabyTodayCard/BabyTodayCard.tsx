"use client";

import Image from "next/image";

import { WeeksResponse } from "@/lib/api/clientApi/weeks";

import css from "./BabyTodayCard.module.css";

type Props = {
	data: WeeksResponse | undefined
};

const BabyTodayCard = ({data}: Props) => {
  return (
    <div className={css.aboutBabyContainer}>
      <h2 className={css.babyHeaderline}>Малюк сьогодні</h2>

      <div className={css.CharacteristicsWrapper}>
        <Image
          className={css.babyImg}
          src={data?.babyState?.image ?? "/image/default-week.jpeg"}
          alt={data?.babyState?.analogy ?? "Calendar entry holds a pencil"}
          width={287}
          height={216}
        />
        {data && (
          <div>
            <p className={css.titlesOfBabyToday}>
              Розмір:
              <span className={css.babyDescriptionText}>
                {data?.babyState?.babySize}
              </span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Вага:
              <span className={css.babyDescriptionText}>
                {data?.babyState?.babyWeight}
              </span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Активність:
              <span className={css.babyDescriptionText}>
                {data?.babyState?.babyActivity}
              </span>
            </p>
          </div>
        )}
      </div>

      <p className={css.babyDevelopment}>
        {data?.babyState.babyDevelopment}
      </p>
    </div>
  );
};

export default BabyTodayCard;
