"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateUserAvatar } from "@/lib/api/clientApi/users";
import type { User } from "@/types/user";
import css from "./ProfileAvatar.module.css";
import toast from "react-hot-toast";

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      toast.success("Фото профілю оновлено");
      router.refresh();
    },
    onError: () => {
      toast.error("Не вдалося завантажити фото");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // =========CHEK-TYPE-OF-FILE=========================
    if (!file.type.startsWith("image/")) {
      toast.error("Можна завантажити тільки зображення");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Максимальний розмір — 5MB");
      return;
    }
    // =========END-CHEK-TYPE-OF-FILE=========================

    const formData = new FormData();
    formData.append("avatar", file);

    mutate(formData);
    e.target.value = "";
  };

  return (
    <section className={css.wrapper}>
      <Image
        className={css.avatar}
        src={user.avatar || "/Avatar-def.jpg"}
        alt={user.name}
        width={120}
        height={120}
      />
      <div className={css.content}>
        <div className={css.infoUser}>
          <p className={css.name}>{user.name}</p>
          <p className={css.email}>{user.email}</p>
        </div>

        <button
          className={css.button}
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
        >
          {isPending ? "Завантаження..." : "Завантажити нове фото"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
        aria-label="Завантажити аватар"
      />
    </section>
  );
}
