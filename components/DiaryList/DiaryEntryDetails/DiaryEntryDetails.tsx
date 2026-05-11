"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { DiaryEntryDetail } from "@/types/diary";

import { deleteDiaryEntry } from "@/lib/api/clientApi/diaries";

import ConfirmationModal from "@/components/Layout/ConfirmationModal/ConfirmationModal";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";
import { DiaryEntryForm } from "@/components/AddDiaryEntryForm/AddDiaryEntryForm";

import { useDiaryStore } from "@/lib/store/diaryStore";

import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  entry: DiaryEntryDetail | null;
}

const DiaryEntryDetails = ({ entry }: DiaryEntryDetailsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const setDiaryEditing = useDiaryStore(state => state.setDiaryEditing);
  const queryClient = useQueryClient();

	const router = useRouter();
	const searchParams = useSearchParams();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => deleteDiaryEntry(id),
    onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["diary"],
			});

			const params = new URLSearchParams(searchParams);

			params.delete("diaryId");

			router.push(`/diary?${params.toString()}`);

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
						<button
              className={css.icon_container}
              onClick={handleEdit}
              disabled={isDeleting}>
							<svg className={css.icon}>
								<use href="/sprite.svg#edit_square"></use>
							</svg>
						</button>
          </div>
          <div className={css.actions}>
            <p className={css.date}>{formattedDate}</p>
						
						<button
              className={css.icon_container}
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={isDeleting}
							>
							<svg className={css.icon}>
								<use href="/sprite.svg#delete_forever"></use>
							</svg>
						</button>
          </div>
        </div>

        <div className={css.content}>
          <p className={css.description}>{entry.description}</p>
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
      </div>

			<ConfirmationModal
			isOpen={isDeleteModalOpen}
			title="Ви впевнені, що хочете видалити запис?"
			description="Цю дію неможливо буде скасувати."
			confirmButtonText="Видалити"
			cancelButtonText="Скасувати"
			onCancel={() => {
				setIsDeleteModalOpen(false);
			}} 
			onConfirm={() => {
 				handleDelete(entry._id); 
				setDiaryEditing(false);
			}}
			isLoading={isDeleting}
		/>

      {isEditModalOpen && (
        <AddDiaryEntryModal
          title="Редагувати запис"
          onClose={() => setIsEditModalOpen(false)}
        >
          <DiaryEntryForm
						currentId={entry._id}
						type={"edit"}
            onClose={() => setIsEditModalOpen(false)}
          />
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryEntryDetails;
