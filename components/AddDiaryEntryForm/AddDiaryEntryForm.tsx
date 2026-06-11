"use client";
import { useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import toast from "react-hot-toast";

import { Emotion, fetchEmotions } from "@/lib/api/clientApi/emotions";
import {
  createDiaryEntry,
  updateDiaryEntry,
} from "@/lib/api/clientApi/diaries";

import css from "./AddDiaryEntryForm.module.css";
import { DiaryEntry } from "@/types/diary";
import { Button } from "../Button/Button";

type UpdateDiaryPayload = {
  id: string;
  payload: {
    title: string;
    emotions: string[];
    description: string;
    date: string;
  };
};

type CreatePayload = {
  title: string;
  emotions: string[];
  description: string;
  date: string;
};

type Props = {
  onClose: () => void;
  type: string;
  currentId: string;
  initialData?: {
    title: string;
    emotions: string[];
    description: string;
  };
};

export const DiaryEntryForm = ({
  onClose,
  type,
  currentId,
  initialData,
}: Props) => {
  const queryClient = useQueryClient();
  const selectRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        if (toggleRef.current) toggleRef.current.checked = false;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: emotions = [] } = useQuery({
    queryKey: ["emotions"],
    queryFn: fetchEmotions,
  });

  const createMutate = useMutation({
    mutationFn: createDiaryEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      toast.success("Збережено!");
      onClose();
    },
    onError: () => toast.error("Помилка створення запису!"),
  });

  const updateMutate = useMutation({
    mutationFn: ({ id, payload }: UpdateDiaryPayload) =>
      updateDiaryEntry(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["diary"],
      });

      toast.success("Збережено!");

      onClose();
    },

    onError: () => {
      toast.error("Помилка запиту");
    },
  });

  async function handleCreateDiary(payload: CreatePayload) {
    await createMutate.mutateAsync(payload);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: initialData?.title ?? "",
        emotions: initialData?.emotions ?? [],
        description: initialData?.description ?? "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().min(1).required("Обов'язкове поле"),
        description: Yup.string().min(1).max(1000).required("Обов'язкове поле"),
        emotions: Yup.array()
          .min(1, "Оберіть хоча б одну категорію")
          .required("Обов'язково"),
      })}
      onSubmit={(values) => {
        const payload: DiaryEntry = {
          ...values,
          date: new Date().toISOString().split("T")[0],
        };

        if (type !== "edit") {
          handleCreateDiary(payload);

          return;
        }

        if (!currentId) {
          toast.error("Diary id not found");

          return;
        }

        updateMutate.mutate({
          id: currentId,
          payload,
        });
      }}
    >
      {({ values, errors }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label className={css.label}>Заголовок</label>
            <Field
              name="title"
              className={css.input}
              placeholder="Введіть заголовок запису"
              aria-invalid={!!errors.title}
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label}>Категорії</label>

            <input
              ref={toggleRef}
              type="checkbox"
              id="category-toggle"
              className={css.toggleCheckbox}
            />

            <div ref={selectRef} className={css.selectWrapper}>
              <label
                htmlFor="category-toggle"
                className={css.customSelect}
                aria-invalid={!!errors.emotions}
              >
                <div className={css.selectedTags}>
                  {values.emotions.length > 0 ?
                    values.emotions.map((emoValue: string) => {
                      const emoLabel = emotions.find(
                        (e) => e._id === emoValue,
                      )?.title;
                      return (
                        <span key={emoValue} className={css.tag}>
                          {emoLabel}
                        </span>
                      );
                    })
                  : <span className={css.placeholder}>Оберіть категорію</span>}
                </div>
                <span className={css.arrow}></span>
              </label>

              <ul className={css.optionsList}>
                {emotions.map((emo: Emotion) => (
                  <li key={emo._id} className={css.optionItem}>
                    <label
                      htmlFor={emo._id}
                      className={css.optionLabel}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <Field
                        id={emo._id}
                        type="checkbox"
                        name="emotions"
                        value={emo._id}
                        className={css.hiddenCheckbox}
                      />
                      <span className={css.customCheckbox}></span>
                      <span className={css.optionText}>{emo.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <ErrorMessage
              name="emotions"
              component="div"
              className={css.error}
            />
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
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
          </div>

          <Button type="submit" className={css.submitBtn}>
            Зберегти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
