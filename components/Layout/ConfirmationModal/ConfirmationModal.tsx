"use client";

import Modal from "@/components/modals/Modal/Modal";
import css from "./ConfirmationModal.module.css";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
  errorMessage?: string;
  description?: string;
};

const ConfirmationModal = ({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  isLoading = false,
  errorMessage,
  description,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <div className={css.wrapper}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити модальне вікно"
        >
          <svg className={css.closeIcon} aria-hidden="true">
            <use href="/sprite.svg#close" />
          </svg>
        </button>

        <h2 className={css.title}>{title}</h2>

        {description && <p className={css.text}>{description}</p>}

        {errorMessage && <p className={css.error}>{errorMessage}</p>}

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancel}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={css.confirm}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Зачекайте..." : confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
