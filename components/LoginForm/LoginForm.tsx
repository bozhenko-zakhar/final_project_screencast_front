'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import css from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { login } from '@/lib/api/clientApi/auth';
import { getMe } from '@/lib/api/clientApi/users';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { isAxiosError } from 'axios';
import { type LoginRequest as LoginFormValues } from '@/types/auth';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('Некоректна пошта').required('Обовʼязкове поле'),
  password: Yup.string().required('Обовʼязкове поле'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const fieldId = useId();
  const setUser = useAuthStore(state => state.setUser);

  return (
    <div className={css.loginPage}>
      <div className={css.logo}>
        <svg className={css.logoIcon} width={30} height={30}>
          <use href="/icons.svg#logo" />
        </svg>
        <svg className={css.logoLeleka} width={60} height={13}>
          <use href="/icons.svg#icon-leleka" />
        </svg>
      </div>
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
            }: FormikHelpers<LoginFormValues>
          ) => {
            try {
              const data = { email: values.email, password: values.password };
              const res = await login(data);
              if (res) {
                const user = await getMe();
                setUser(user);
                router.push('/');
                resetForm();
              }
            } catch (error: unknown) {
              if (isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Помилка входу');
              } else {
                toast.error('Щось пішло не так');
              }
              setErrors({
                password: 'Невірний email або пароль',
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Вхід</h1>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
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
                  className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  className={css.error}
                  component="span"
                />
              </div>
              <button type="submit" disabled={isSubmitting} className={css.btn}>
                {isSubmitting ? 'Завантаження...' : 'Увійти'}
              </button>

              <p className={css.register}>
                Немає акаунту?{' '}
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