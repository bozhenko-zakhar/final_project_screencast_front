'use client';

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

import styles from './AddTaskForm.module.css';

import type { CreateTaskPayload } from '@/types/tasks';

type AddTaskFormProps = {
  initialValues: CreateTaskPayload;
  onSubmit: (values: CreateTaskPayload) => Promise<void> | void;
  isSubmitting?: boolean;
};

const getTodayDateString = () => new Date().toISOString().slice(0, 10);

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'Введіть назву завдання')
    .max(96, 'Назва завдання має бути не довшою за 96 символів')
    .required('Введіть назву завдання'),

  date: Yup.string()
    .required('Оберіть дату')
    .test('not-in-past', 'Дата не може бути в минулому', (value) => {
      if (!value) return false;

      return value >= getTodayDateString();
    }),
});

export default function AddTaskForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
}: AddTaskFormProps) {
  const handleSubmit = async (
    values: CreateTaskPayload,
    helpers: FormikHelpers<CreateTaskPayload>
  ) => {
    try {
      await onSubmit({
        name: values.name.trim(),
        date: values.date,
      });

      helpers.resetForm();
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik<CreateTaskPayload>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting: isFormikSubmitting }) => {
        const isDisabled = isSubmitting || isFormikSubmitting;

        return (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-name">
                Завдання
              </label>

              <Field
                id="task-name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Введіть завдання"
                disabled={isDisabled}
              />

              <ErrorMessage
                name="name"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-date">
                Дата
              </label>

              <Field
                id="task-date"
                name="date"
                type="date"
                min={getTodayDateString()}
                className={styles.input}
                disabled={isDisabled}
              />

              <ErrorMessage
                name="date"
                component="p"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isDisabled}
            >
              {isDisabled ? 'Збереження...' : 'Зберегти'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}