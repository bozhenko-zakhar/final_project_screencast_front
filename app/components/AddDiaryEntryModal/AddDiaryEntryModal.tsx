"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./AddDiaryEntryModal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export default function DiaryEntryModal({ children, onClose, title }: ModalProps) {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
          <button className={css.closeBtn} onClick={onClose} aria-label="Закрити">
            &times;
          </button>
        </div>
        <div className={css.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}