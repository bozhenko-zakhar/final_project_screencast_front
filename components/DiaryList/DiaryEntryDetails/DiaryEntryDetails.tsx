"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import css from "./DiaryEntryDetails.module.css";
import { DiaryEntryDetail } from "@/types/diary";
import { deleteDiaryEntry } from "@/lib/api/clientApi/diaries";
import ConfirmationModal from "@/components/Layout/ConfirmationModal/ConfirmationModal";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import { DiaryEntryForm } from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";
// import { useDiaryStore } from "@/lib/store/diaryStore";

interface DiaryEntryDetailsProps {
  entry: DiaryEntryDetail | null;
}

const DiaryEntryDetails = ({ entry }: DiaryEntryDetailsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const currentDiary = useDiaryStore(state => state.currentDiary);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => deleteDiaryEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      toast.success("Запис видалено!");
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error("Помилка при видаленні запису");
    },
  });

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

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

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
              disabled={isDeleting}
            >
              Редагувати
            </button>
            <button
              className={css.deleteButton}
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={isDeleting}
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
        title="Ви впевнені, що хочете видалити запис?"
        description="Цю дію неможливо буде скасувати."
        confirmButtonText="Видалити"
        cancelButtonText="Скасувати"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(entry.id)}
        isLoading={isDeleting}
      />

      {isEditModalOpen && (
        <AddDiaryEntryModal
          title="Редагувати запис"
          onClose={() => setIsEditModalOpen(false)}
        >
          <DiaryEntryForm onClose={() => setIsEditModalOpen(false)} />
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryEntryDetails;
