'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast'; 
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';
import { nextServer } from '@/lib/api/api'; 
import { getMe } from '@/lib/api/clientApi/users';
import styles from './OnboardingForm.module.css';

export default function OnboardingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState('');
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
    if (!name.trim()) newErrors.name = "Ім'я є обов'язковим";
    if (!dueDate) newErrors.dueDate = "Будь ласка, вкажіть дату";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!validate()) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', name); 
      formData.append('dueDate', dueDate);
      formData.append('gender', gender);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      await nextServer.patch('/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
            <Image src={avatarPreview} alt="Avatar" fill className={styles.image} />
          ) : (
            <Image src="/Avatar-def.jpg" alt="Default Avatar" fill className={styles.image} />
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
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          Завантажити фото
        </button>
      </div>

      <div className={styles.inputGroup}>
        <label>{"Ім'я"}</label>
        <input
          type="text"
          placeholder="Введіть ваше ім'я"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      

      <div className={styles.inputGroup}>
        <label>Стать дитини</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="boy">Хлопчик</option>
          <option value="girl">Дівчинка</option>
          <option value="unknown">Ще не знаю</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Планова дата пологів</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (errors.dueDate) setErrors({ ...errors, dueDate: '' });
          }}
          className={errors.dueDate ? styles.errorInput : ''}
        />
        {errors.dueDate && <span className={styles.errorText}>{errors.dueDate}</span>}
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