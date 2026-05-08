"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import {
  fetchEmotions,
  getEmotionId,
  type Emotion,
} from "@/lib/api/clientApi/emotions";
import {
  createDiaryEntry,
  updateDiaryEntry,
} from "@/lib/api/clientApi/diaries";
import type { DiaryEntryFormValues } from "@/types/diary";

import css from "./AddDiaryEntryForm.module.css";

type AddDiaryEntryFormProps = {
  onClose: () => void;
  entryId?: string;
  initialValues?: DiaryEntryFormValues;
};

const defaultInitialValues: DiaryEntryFormValues = {
  title: "",
  emotions: [],
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .max(100, "Максимум 100 символів")
    .required("Обов'язкове поле"),

  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, "Оберіть хоча б одну категорію")
    .required("Обов'язкове поле"),

  description: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .max(1000, "Максимум 1000 символів")
    .required("Обов'язкове поле"),
});

export const DiaryEntryForm = ({
  onClose,
  entryId,
  initialValues = defaultInitialValues,
}: AddDiaryEntryFormProps) => {
  const queryClient = useQueryClient();
  const isEditMode = Boolean(entryId);

  const { data: emotions = [], isLoading: isEmotionsLoading } = useQuery({
    queryKey: ["emotions"],
    queryFn: fetchEmotions,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: DiaryEntryFormValues) => {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        emotions: values.emotions,
      };

      if (entryId) {
        return updateDiaryEntry({ entryId, payload });
      }

      return createDiaryEntry(payload);
    },

    onSuccess: async (updatedEntry) => {
      await queryClient.invalidateQueries({ queryKey: ["diary"] });

      if (entryId) {
        queryClient.setQueryData(["diaryEntry", entryId], updatedEntry);
      }

      toast.success(isEditMode ? "Запис оновлено!" : "Запис збережено!");
      onClose();
    },

    onError: (error) => {
      console.error("MUTATION ERROR:", error);

      toast.error(
        isEditMode
          ? "Помилка при редагуванні запису"
          : "Помилка при створенні запису"
      );
    },
  });

  return (
    <Formik<DiaryEntryFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {({ values, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label className={css.label} htmlFor="diary-title">
              Заголовок
            </label>

            <Field
              id="diary-title"
              name="title"
              className={css.input}
              placeholder="Введіть заголовок запису"
              aria-invalid={Boolean(touched.title && errors.title)}
            />

            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

					<div className={css.field}>
					<label className={css.label}>Категорії</label>
					
					<input type="checkbox" id="category-toggle" className={css.toggleCheckbox} />
					
					<div className={css.selectWrapper}>
						<label 
							htmlFor="category-toggle" 
							className={css.customSelect}
							aria-invalid={!!errors.emotions}
						>
							<div className={css.selectedTags}>
								{values.emotions.length > 0 ? (
									values.emotions.map((emoValue: string) => {
										const emoLabel = emotions.find(e => e._id.$oid === emoValue)?.title;
										return <span key={emoValue} className={css.tag}>{emoLabel}</span>;
									})
								) : (
									<span className={css.placeholder}>Оберіть категорію</span>
								)}
							</div>
							<span className={css.arrow}></span>
						</label>

						<div className={css.optionsList}>
							{emotions.map((emo: Emotion) => (
								<label key={emo._id.$oid} className={css.optionItem}>
									<Field
										type="checkbox"
										name="emotions"
										value={emo._id.$oid} // Передаємо ID в Formik
										className={css.hiddenCheckbox}
									/>
									<div className={css.customCheckbox}></div>
									<span className={css.optionText}>{emo.title}</span>
								</label>
							))}
						</div>
					</div>

					<ErrorMessage name="emotions" component="div" className={css.error} />
					</div>

					<div className={css.field}>
						<label className={css.label}>Запис</label>
						<Field 
							as="textarea" 
							name="description" 
							className={css.textarea} 
							placeholder="Запишіть, як ви себе відчуваєте"
							aria-invalid={!!errors.description}      
						/>
						<ErrorMessage name="description" component="div" className={css.error} />
					</div>

					<button type="submit" disabled={isPending} className={css.submitBtn}>
						Зберегти       
					</button>
				</Form>
      )}
    </Formik>
  );
};