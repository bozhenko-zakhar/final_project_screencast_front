'use client';

import { Formik, Form, Field } from 'formik';

type Props = {
  onSubmit: (values: { name: string; date: string }) => void;
};

export default function AddTaskForm({ onSubmit }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Formik
      initialValues={{
        name: '',
        date: today,
      }}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label>Завдання</label>
          <Field name="name" type="text" />
        </div>

        <div>
          <label>Дата</label>
          <Field name="date" type="date" />
        </div>

        <button type="submit">Зберегти</button>
      </Form>
    </Formik>
  );
}