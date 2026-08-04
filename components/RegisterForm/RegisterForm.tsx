'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { isAxiosError } from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './RegisterForm.module.css';
import { register } from '@/lib/api/clientApi/auth';
import { useAuthStore } from '@/lib/store/authStore';
import type { RegisterRequest } from '@/types/auth';
import type { User } from '@/types/user';
import { Button } from '../Button/Button';

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

  return (
    <div className={css.page}>
			<Link href="/" className={css.logo}>
				<svg className={css.logo_icon}>
					<use href="/logo.svg#icon-alternate-false"></use>
				</svg>
			</Link>
			
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
              password: values.password
            };

            try {
              const user: User = await register(registerRequest);

              setUser(user);
              resetForm();
              router.push('/onboarding');
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
              <h2 className={css.title}>Реєстрація</h2>

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

              <Button type="submit" disabled={isSubmitting} className={css.btn}>
                {isSubmitting ? 'Завантаження...' : 'Зареєструватись'}
              </Button>

              <p className={css.login}>
                Вже маєте аккаунт?{' '}
                <span>
                  <Link href="/auth/login">Увійти</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
