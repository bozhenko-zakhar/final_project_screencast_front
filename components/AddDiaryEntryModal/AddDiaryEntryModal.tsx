"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

import css from "./AddDiaryEntryModal.module.css";

type AddDiaryEntryModalProps = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
};

export default function AddDiaryEntryModal({
  children,
  onClose,
  title,
}: AddDiaryEntryModalProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="diary-modal-title"
    >
      <div className={css.modal}>
        <div className={css.header}>
          <h2 id="diary-modal-title" className={css.title}>
            {title}
          </h2>

          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Закрити модальне вікно"
          >
            &times;
          </button>
        </div>

        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}