"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateUserAvatar } from "@/lib/api/clientApi";
import type { User } from "@/app/types/user";
import css from "./ProfileAvatar.module.css";

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        alt={user.username}
        width={120}
        height={120}
      />
      <div className={css.infoUser}>
        <p className={css.name}>{user.username}</p>
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
