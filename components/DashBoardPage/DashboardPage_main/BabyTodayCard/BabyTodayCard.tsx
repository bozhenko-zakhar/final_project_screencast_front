"use client"

import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchPrivateWeeks, fetchPublicWeeks } from "@/lib/api/clientApi/weeks";

import css from "./BabyTodayCard.module.css";

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
		<div className={css.aboutBabyContainer}>
			<h2 className={css.babyHeaderline}>Малюк сьогодні</h2>

			<div className={css.CharacteristicsWrapper}>
				<Image
					className={css.babyImg}
					src={babyData?.babyState.image ?? "/image/default-week.jpeg"}
					alt={babyData?.babyState.analogy ?? "Calendar entry holds a pencil"}
					width={287}
					height={216}
				/>
				<div>
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
							{babyData?.babyState.babyActivity}
						</span>
					</p>
				</div>
			</div>

			<p className={css.babyDevelopment}>{babyData?.babyState.babyDevelopment}</p>
		</div>
  );
};

export default BabyTodayCard;
