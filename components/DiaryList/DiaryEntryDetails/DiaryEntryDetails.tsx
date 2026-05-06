"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./DiaryEntryDetails.module.css";
import { DiaryEntryDetail } from "@/types/diary";
import { useDiaryStore } from "@/lib/store/diaryStore";
import ConfirmationModal from "@/components/Layout/ConfirmationModal/ConfirmationModal";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import { DiaryEntryForm } from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";

interface DiaryEntryDetailsProps {
  entry: DiaryEntryDetail | null;
}

const DiaryEntryDetails = ({ entry }: DiaryEntryDetailsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteEntry } = useDiaryStore();

  const handleDelete = async () => {
    if (!entry) return;
    try {
      await deleteEntry(entry.id);
      toast.success("Запис видалено!");
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("Помилка при видаленні запису");
    }
  };

  if (!entry) {
    return (
      <div className={css.container}>
        <div className={css.placeholder}>Наразі записи у щоденнику відстні</div>
      </div>
    );
  }

  const formattedDate = new Date(entry.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div>
            <h2 className={css.title}>{entry.title}</h2>
            <p className={css.date}>{formattedDate}</p>
          </div>
          <div className={css.actions}>
            <button 
              className={css.editButton} 
              onClick={handleEdit}
            >
              Редагувати
            </button>
            <button 
              className={css.deleteButton} 
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Видалити
            </button>
          </div>
        </div>

        {entry.emotions && entry.emotions.length > 0 && (
          <div className={css.emotions}>
            {entry.emotions.map((emotion) => (
              <span key={emotion.id} className={css.emotionTag}>
                {emotion.title}
              </span>
            ))}
          </div>
        )}

        <div className={css.content}>
          <p className={css.description}>{entry.description}</p>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={false}
      />

      {isEditModalOpen && (
        <AddDiaryEntryModal 
          title="Редагувати запис"
          onClose={() => setIsEditModalOpen(false)}
        >
          <DiaryEntryForm 
            onClose={() => setIsEditModalOpen(false)} 
            initialData={entry}
          />
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryEntryDetails;
