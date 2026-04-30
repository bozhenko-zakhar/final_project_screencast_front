'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

import css from './page.module.css';

import clsx from 'clsx';
import Image from 'next/image';

import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError('');
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push('/profile');
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.response?.message ??
            err.response?.data?.error ??
            err.message ??
            'Request failed'
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Oops... some error');
      }
    }
  };
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
        <div className={css.formBox}>
          <RegisterForm onSubmit={handleSubmit} error={error} />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/register.png"
            alt="logih image"
            width={720}
            height={900}
          />
        </div>
      </div>
    </main>
  );
}