'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe, updateAvatar } from '@/lib/api/clientApi/users';
import css from './OnboardingForm.module.css';

export const OnboardingForm = () => {
  const router = useRouter();
  const setUserStore = useAuthStore((state) => state.setUser);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('/Avatar-def.jpg');
  const [gender, setGender] = useState<"boy" | "girl">("girl");
  const [dueDate, setDueDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileMutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      setUserStore(data.user || data); 
      toast.success('Профіль оновлено!');
      router.push('/diary');
    },
    onError: () => toast.error('Помилка оновлення профілю'),
  });

  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (data) => {
      setUserStore(data.user || data);
    },
    onError: () => toast.error('Помилка завантаження фото'),
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      await avatarMutation.mutateAsync(formData);
    }
    profileMutation.mutate({ gender, dueDate });
  };

  const isLoading = profileMutation.isPending || avatarMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.avatarContainer}>
        <div className={css.avatarCircle}>
          <Image src={avatarPreview} alt="Avatar" width={100} height={100} className={css.image} />
        </div>
        <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
        <button type="button" onClick={() => fileInputRef.current?.click()} className={css.uploadBtn}>
          Змінити фото
        </button>
      </div>

      <div className={css.genderSelector}>
        <label className={css.radioLabel}>
          <input 
            type="radio" 
            value="boy" 
            checked={gender === 'boy'} 
            onChange={() => setGender('boy')} 
          />
          Хлопчик
        </label>
        <label className={css.radioLabel}>
          <input 
            type="radio" 
            value="girl" 
            checked={gender === 'girl'} 
            onChange={() => setGender('girl')} 
          />
          Дівчинка
        </label>
      </div>

      <div className={css.inputGroup}>
        <label>Дата народження малюка (або очікувана):</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          required 
          className={css.dateInput} 
        />
      </div>

      <button type="submit" disabled={isLoading} className={css.submitBtn}>
        {isLoading ? 'Збереження...' : 'Завершити'}
      </button>
    </form>
  );
};