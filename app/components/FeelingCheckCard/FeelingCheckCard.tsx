"use client";

import { useRouter } from "next/navigation";

import styles from "./FeelingCheckCard.module.css";
import cardStyles from "../DashboardPage/DashboardPage.module.css";

const FeelingCheckCard = () => {
  const router = useRouter();

  const handleClick = () => {
    // гість → ведемо на сторінку реєстрації
    router.push("/auth/register");
  };

  return (
    <section
      className={`${cardStyles.card} ${cardStyles.cardFixedHeight} ${styles.feeling}`}
    >
      <h2 className={styles.title}>Як ви себе почуваєте?</h2>

      <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
      <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>

      <button type="button" className={styles.button} onClick={handleClick}>
        Зробити запис у щоденник
      </button>
    </section>
  );
};

export default FeelingCheckCard;
