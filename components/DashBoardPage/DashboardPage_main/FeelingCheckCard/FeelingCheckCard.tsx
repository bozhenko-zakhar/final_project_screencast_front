"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./FeelingCheckCard.module.css";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";

import { useAuthStore } from "@/lib/store/authStore";
import DiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import { DiaryEntryForm } from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";
import { Button } from "@/components/Button/Button";

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
      <div
        className={`${cardStyles.card} ${cardStyles.feelingHeight} ${styles.feeling}`}
      >
        <h2 className={styles.title}>Як ви себе почуваєте?</h2>
        <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
        <p className={styles.text}>Занотуйте незвичні відчуття у тілі.</p>
        
        <Button onClick={handleOpenModal} className={styles.button}> 
          Зробити запис у щоденник
        </Button>
      </div>

      {isModalOpen && (
        <DiaryEntryModal onClose={handleCloseModal} title="Новий запис">
          <DiaryEntryForm currentId="0" type="create" onClose={handleCloseModal} />
        </DiaryEntryModal>
      )}
    </>
  );
};

export default FeelingCheckCard;
