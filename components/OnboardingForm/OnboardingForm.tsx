'use client';

import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useAuthStore } from '@/lib/store/authStore';
import { nextServer } from '@/lib/api/api';
import { getMe } from '@/lib/api/clientApi/users';

import CalendarPicker from '@/components/CalendarPicker/CalendarPicker';

import styles from './OnboardingForm.module.css';
import css from '../Button/Button.module.css';

export default function OnboardingForm() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setUser } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [dueDate, setDueDate] = useState('');

  const [gender, setGender] = useState('unknown');

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!dueDate) {
      newErrors.dueDate = 'Будь ласка, вкажіть дату';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      // update user data
      await nextServer.patch('/users/me', {
        date: dueDate,
        gender: gender === 'unknown' ? null : gender,
      });

      // update avatar
      if (avatarFile) {
        const avatarData = new FormData();

        avatarData.append('avatar', avatarFile);

        await nextServer.patch('/users/me/avatar', avatarData);
      }

      const updatedUser = await getMe();

      if (updatedUser) {
        setUser(updatedUser);
      }

      toast.success('Дані збережено успішно!');

      router.push('/');
    } catch (error: unknown) {
      let errorMsg = 'Виникла помилка під час збереження даних';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.avatarSection}>
        <div
          className={styles.avatarPreview}
          onClick={() => fileInputRef.current?.click()}
        >
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar"
              fill
              sizes="164px"
              className={styles.image}
            />
          ) : (
            <Image
              src="/Avatar-def.jpg"
              alt="Default Avatar"
              fill
              sizes="164px"
              className={styles.image}
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          className={styles.hiddenInput}
        />

        <button
          type="button"
          className={css.button}
          onClick={() => fileInputRef.current?.click()}
        >
          Завантажити фото
        </button>
      </div>

      <div className={styles.inputGroup}>
        <label>Стать дитини</label>

        <div className={styles.selectWrapper}>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.customSelect}
          >
            <option value="boy">Хлопчик</option>

            <option value="girl">Дівчинка</option>
            <option value="unknown">Ще не знаю</option>
          </select>

          <svg width="12" height="7" className={styles.selectIcon}>
            <use href="/sprite.svg#arrow-down" />
          </svg>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Планова дата пологів</label>

        <CalendarPicker
          value={dueDate}
          placeholder="дд.мм.рррр"
          error={Boolean(errors.dueDate)}
          onChange={(date) => {
            setDueDate(date);

            if (errors.dueDate) {
              setErrors({ ...errors, dueDate: '' });
            }
          }}
        />

        {errors.dueDate && (
          <span className={styles.errorText}>
            {errors.dueDate}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Збереження...' : 'Зберегти'}
      </button>
    </form>
  );
}
