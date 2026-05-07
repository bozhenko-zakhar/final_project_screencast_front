"use client";

import { useQuery } from "@tanstack/react-query";

import styles from "./FeelingCheckCard.module.css";
import { getMomStateInfo } from "@/lib/api/clientApi/weeks";

type UserFeelingContentProps = {
  weekNumber: string;
};

const UserFeelingContent = ({ weekNumber }: UserFeelingContentProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["week-feelings", weekNumber],
    queryFn: () => getMomStateInfo(+weekNumber)
  });

  if (isLoading) {
    return (
      <>
        <h2 className={styles.title}>Як ви можете почуватись</h2>
        <p className={styles.text}>Завантаження...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h2 className={styles.title}>Як ви можете почуватись</h2>
        <p className={styles.text}>
          Не вдалося завантажити інформацію про самопочуття.
        </p>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <h2 className={styles.title}>Як ви можете почуватись</h2>
        <p className={styles.text}>Інформація для цього тижня відсутня.</p>
      </>
    );
  }

  return (
    <>
      <h2 className={styles.title}>Як ви можете почуватись</h2>

      <div className={styles.tags}>
        {data.feelings.states.map((state) => (
          <span key={state} className={styles.tag}>
            {state}
          </span>
        ))}
      </div>

      <p className={styles.text}>{data.feelings.sensationDescr}</p>
    </>
  );
};

export default UserFeelingContent;