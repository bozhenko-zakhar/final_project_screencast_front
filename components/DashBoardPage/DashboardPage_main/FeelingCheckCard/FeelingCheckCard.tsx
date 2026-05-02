"use client";

import { useRouter } from "next/navigation";

import styles from "./FeelingCheckCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

const FeelingCheckCard = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userWeek = useAuthStore((state) => state.user?.pregnancyWeek || 1);


  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
    }
    setIsModalOpen(true);
  }

  return (
    <>
    
      <section
        className={`${cardStyles.card} ${cardStyles.cardFixedHeight} ${styles.feeling}`}
      >
        {isAuthenticated ? (
        <UserFeelingContent weekNumber = {userWeek}/>
        ) : (
            <>
              <h2 className={styles.title}>Як ви себе почуваєте?</h2>

              <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
              <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>

              <button type="button" className={styles.button} onClick={handleOpenModal}>
                Зробити запис у щоденник
              </button>
            </>
        )}
      </section>
      {
      isAuthenticated && (
        <AddDiaryEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
          )}
      </>
  );
};

export default FeelingCheckCard;

const UserFeelingContent = ({ weekNumber }: { weekNumber: number }) => {
  
}
