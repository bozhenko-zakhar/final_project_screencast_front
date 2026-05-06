'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { isAxiosError } from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './RegisterForm.module.css';
import { register } from '@/lib/api/clientApi/auth';
import { useAuthStore } from '@/lib/store/authStore';
import type { RegisterRequest } from '@/types/auth';
import type { User } from '@/types/user';

type RegisterFormValues = RegisterRequest;

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string().required('Обовʼязкове поле'),
  email: Yup.string().email('Некоректна пошта').required('Обовʼязкове поле'),
  password: Yup.string().required('Обовʼязкове поле'),
});

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegisterForm() {
  const router = useRouter();
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const [dueDate, setDueDate] = useState('');
  const [gender, setGender] = useState('');

  return (
    <div className={css.page}>
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
          validationSchema={RegisterFormSchema}
          onSubmit={async (
            values: RegisterFormValues,
            {
              setSubmitting,
              resetForm,
              setErrors,
            }: FormikHelpers<RegisterFormValues>
          ) => {
            const registerRequest: RegisterRequest = {
              name: values.name.trim(),
              email: values.email.trim(),
              password: values.password,
              ...(dueDate && { dueDate }),
              ...(gender && { gender }),
            };

            try {
              const user: User = await register(registerRequest);

              setUser(user);
              resetForm();
              router.push('/');
            } catch (error: unknown) {
              if (isAxiosError(error)) {
                toast.error(
                  error.response?.data?.response?.message ||
                    error.response?.data?.message ||
                    'Помилка реєстрації'
                );
              } else {
                toast.error('Щось пішло не так');
              }

              setErrors({
                password: 'Перевірте дані для реєстрації',
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Реєстрація</h1>

              <label htmlFor={`${fieldId}-name`} className={css.label}>
                Імʼя*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-name`}
                  type="text"
                  name="name"
                  className={`${css.input} ${
                    errors.name && touched.name ? css.inputError : ''
                  }`}
                  placeholder="Ваше імʼя"
                />
                <ErrorMessage
                  name="name"
                  className={css.error}
                  component="span"
                />
              </div>

              <label htmlFor={`${fieldId}-email`} className={css.label}>
                Пошта*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  className={`${css.input} ${
                    errors.email && touched.email ? css.inputError : ''
                  }`}
                  placeholder="hello@leleka.com"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  className={css.error}
                  component="span"
                />
              </div>

              <label htmlFor={`${fieldId}-password`} className={css.label}>
                Пароль*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`${fieldId}-password`}
                  type="password"
                  name="password"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                  placeholder="********"
                  autoComplete="new-password"
                />
                <ErrorMessage
                  name="password"
                  className={css.error}
                  component="span"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className={css.btn}>
                {isSubmitting ? 'Завантаження...' : 'Зареєструватись'}
              </button>

              <p className={css.register}>
                Вже маєте аккаунт?{' '}
                <span>
                  <Link href="/login">Увійти</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>

        <form>
          <input
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="dueDate"
          />
          <input
            onChange={(e) => setGender(e.target.value)}
            placeholder="gender"
          />
        </form>
      </div>
    </div>
  );
}