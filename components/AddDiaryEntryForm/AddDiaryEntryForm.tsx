
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import toast from "react-hot-toast";

import { Emotion, fetchEmotions } from "@/lib/api/clientApi/emotions";
import { createDiaryEntry, updateDiaryEntry } from "@/lib/api/clientApi/diaries";
import { DiaryEntryDetail } from "@/types/diary";

import css from "./AddDiaryEntryForm.module.css";

interface DiaryEntryFormProps {
  onClose: () => void;
  initialData?: DiaryEntryDetail;
}

export const DiaryEntryForm = ({ onClose, initialData }: DiaryEntryFormProps) => {
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const { data: emotions = [] } = useQuery({
    queryKey: ["emotions"],
    queryFn: fetchEmotions,
  });
    
  const { mutate: createMutate, isPending: isCreating } = useMutation({
    mutationFn: createDiaryEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      toast.success("Збережено!");
      onClose();
    },
    onError: () => toast.error("Помилка запиту"),
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ entryId, data }: { entryId: string; data: any }) =>
      updateDiaryEntry(entryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      queryClient.invalidateQueries({ queryKey: ["diaryEntry"] });
      toast.success("Оновлено!");
      onClose();
    },
    onError: () => toast.error("Помилка запиту"),
  });

  const isPending = isCreating || isUpdating;

  const initialValues = {
    title: initialData?.title || "",
    emotions: initialData?.emotions.map((e) => e.id) || [],
    description: initialData?.description || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().min(1).required("Обов'язкове поле"),
        description: Yup.string().min(1).max(1000).required("Обов'язкове поле"),
        emotions: Yup.array().min(1, "Оберіть хоча б одну категорію").required("Обов'язково"),
      })}
      onSubmit={(values) => {
        if (isEditing && initialData) {
          updateMutate({
            entryId: initialData.id,
            data: {
              title: values.title,
              description: values.description,
              emotions: values.emotions,
              date: initialData.date,
            },
          });
        } else {
          createMutate({
            ...values,
            date: new Date().toISOString().split('T')[0],
          });
        }
      }}
    >
      {({ values, errors }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label className={css.label}>Заголовок</label>
            <Field name="title" className={css.input} placeholder="Введіть заголовок запису" aria-invalid={!!errors.title} />
            <ErrorMessage name="title" component="div" className={css.error}  />
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
            {isPending 
              ? isEditing 
                ? "Оновлення..." 
                : "Збереження..." 
              : isEditing 
              ? "Оновити" 
              : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};