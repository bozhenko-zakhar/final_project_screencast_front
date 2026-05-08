
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import toast from "react-hot-toast";

import { Emotion, fetchEmotions } from "@/lib/api/clientApi/emotions";
import { createDiaryEntry } from "@/lib/api/clientApi/diaries";

import css from "./AddDiaryEntryForm.module.css";
import { useState } from "react";

export const DiaryEntryForm = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
	const [selectedEmo, setSelectedEmo] = useState<Emotion[]>();

    const { data: emotions = [] } = useQuery({
    queryKey: ["emotions"],
    queryFn: fetchEmotions,
    });
    
  const { mutate, isPending } = useMutation({
    mutationFn: createDiaryEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      toast.success("Збережено!");
      onClose();
    },
    onError: () => toast.error("Помилка запиту"),
  });

  return (
    <Formik
      initialValues={{ title: "", emotions: [], description: "" }}
      validationSchema={Yup.object({
        title: Yup.string().min(1).required("Обов'язкове поле"),
        description: Yup.string().min(1).max(1000).required("Обов'язкове поле"),
        emotions: Yup.array().min(1, "Оберіть хоча б одну категорію").required("Обов'язково"),
      })}
      onSubmit={(values) => {
        mutate({
          ...values,
          date: new Date().toISOString().split('T')[0],
        });
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
								{selectedEmo?.length > 0 ? (
									selectedEmo?.map((emoValue: string) => {
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
									<input onClick={(e) => {
										setSelectedEmo([emo])
									}} type="checkbox"/>
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