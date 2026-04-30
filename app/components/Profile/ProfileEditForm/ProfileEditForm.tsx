"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/clientApi";
import type { User, UpdateUserPayload, FormValues } from "@/app/types/user";
import css from "./ProfileEditForm.module.css";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Введіть імʼя"),
  email: Yup.string().email("Некоректний email").required("Введіть email"),
  gender: Yup.string().oneOf(["", "boy", "girl"]),
  dueDate: Yup.string().nullable(),
});

export default function ProfileEditForm({ user }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);
      router.refresh();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        username: user.username,
        email: user.email,
        gender: user.gender || "",
        dueDate: user.dueDate ? user.dueDate.split("T")[0] : "",
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        const payload: UpdateUserPayload = {
          username: values.username,
          email: values.email,
          gender: values.gender || null,
          dueDate: values.dueDate || null,
        };

        mutate(payload, {
          onSuccess: (updatedUser) => {
            queryClient.setQueryData(["user"], updatedUser);

            resetForm({
              values: {
                username: updatedUser.username,
                email: updatedUser.email,
                gender: updatedUser.gender || "",
                dueDate:
                  updatedUser.dueDate ? updatedUser.dueDate.split("T")[0] : "",
              },
            });

            router.refresh();
          },
        });
      }}
    >
      {({ dirty, resetForm }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Імʼя
            <Field className={css.input} type="text" name="username" />
            <ErrorMessage name="username" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Email
            <Field className={css.input} type="email" name="email" />
            <ErrorMessage name="email" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Стать дитини
            <Field as="select" name="gender" className={css.input}>
              <option value="">Не вибрано</option>
              <option value="boy">Хлопчик</option>
              <option value="girl">Дівчинка</option>
            </Field>
          </label>

          <label className={css.label}>
            Планова дата пологів
            <Field className={css.input} type="date" name="dueDate" />
          </label>

          <div className={css.buttons}>
            <button
              className={css.cancelButton}
              type="button"
              onClick={() => resetForm()}
              disabled={!dirty || isPending}
            >
              Відмінити зміни
            </button>

            <button
              className={css.submitButton}
              type="submit"
              disabled={!dirty || isPending}
            >
              {isPending ? "Збереження..." : "Зберегти зміни"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
