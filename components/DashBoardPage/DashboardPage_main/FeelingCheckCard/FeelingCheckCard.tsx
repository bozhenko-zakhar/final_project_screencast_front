"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./FeelingCheckCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import { calculatePregnancyWeek } from "@/app/lib/utils/pregnancyUtils";
// взяти у команди:
// import AddDiaryEntryModal from '@components/AddDiaryEntryModal/AddDiaryEntryModal';
import UserFeelingContent from "./UserFeelingContent";

const FeelingCheckCard = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const currentWeek = user?.dueDate ? calculatePregnancyWeek(user?.dueDate) : 1;

  console.log("Поточний тиждень:", currentWeek); // видалити

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <> 
      <section
        className={`${cardStyles.card} ${cardStyles.cardFixedHeight} ${styles.feeling}`}
      >
        {isAuthenticated ? (
        <UserFeelingContent weekNumber = {currentWeek} />
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
      {/* {isAuthenticated && (
        <AddDiaryEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
          )} */}
      </>
  );
};

export default FeelingCheckCard;


