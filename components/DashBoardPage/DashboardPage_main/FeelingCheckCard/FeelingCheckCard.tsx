"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./FeelingCheckCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import DiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import { DiaryEntryForm } from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";

const FeelingCheckCard = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section
        className={`${cardStyles.card} ${cardStyles.feelingHeight} ${styles.feeling}`}
      >
        <h2 className={styles.title}>Як ви себе почуваєте?</h2>
        <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
        <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>
        <button
          type="button"
          className={styles.button}
          onClick={handleOpenModal}
        >
          Зробити запис у щоденник
        </button>
      </section>

      {isModalOpen && (
        <DiaryEntryModal onClose={handleCloseModal} title="Новий запис">
          <DiaryEntryForm onClose={handleCloseModal} />
        </DiaryEntryModal>
      )}
    </>
  );
};

export default FeelingCheckCard;
