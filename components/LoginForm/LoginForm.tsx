"use client";

import { setThemeByGender } from "@/lib/theme/setThemeByGender";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { login } from "@/lib/api/clientApi/auth";
import { getMe } from "@/lib/api/clientApi/users";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { isAxiosError } from "axios";
import { type LoginRequest as LoginFormValues } from "@/types/auth";
import { Button } from "../Button/Button";
import { useQueryClient } from "@tanstack/react-query";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Некоректна пошта").required("Обовʼязкове поле"),
  password: Yup.string().required("Обовʼязкове поле"),
});

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const fieldId = useId();
	const setUser = useAuthStore((state) => state.setUser);

	const queryClient = useQueryClient();

  return (
    <div className={css.loginPage}>
      <Link href="/" className={css.logo}>
        <svg className={css.logo_icon}>
          <use href="/logo.svg#icon-alternate-false"></use>
        </svg>
      </Link>

      <div className={css.center}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={async (
            values: LoginFormValues,
            {
              setSubmitting,
              resetForm,
              setErrors,
            }: FormikHelpers<LoginFormValues>,
          ) => {
            try {
              const data = { email: values.email, password: values.password };
              const res = await login(data);
              if (res) {
                const user = await getMe();
								setUser(user);

								queryClient.invalidateQueries({
									queryKey: ["baby"],
								});

								queryClient.invalidateQueries({
									queryKey: ["tasks"],
								});

                setThemeByGender(user.gender);

                router.push("/");
                resetForm();
              }
            } catch (error: unknown) {
              if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Помилка входу");
              } else {
                toast.error("Щось пішло не так");
              }
              setErrors({
                password: "Невірний email або пароль",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h2 className={css.title}>Вхід</h2>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  className={`${css.input}`}
                  placeholder="Пошта"
                />
                <ErrorMessage
                  name="email"
                  className={css.error}
                  component="span"
                />
              </div>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-password`}
                  type="password"
                  name="password"
                  className={`${css.input} ${errors.password && touched.password ? css.inputError : ""}`}
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  className={css.error}
                  component="span"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className={css.btn}>
                {isSubmitting ? "Завантаження..." : "Увійти"}
              </Button>

              <p className={css.register}>
                Немає акаунту?{" "}
                <span>
                  <Link href="/auth/register">Зареєструватися</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
