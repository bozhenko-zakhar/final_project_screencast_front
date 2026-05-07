'use client';

import Modal from '../Modal/Modal';
import AddTaskForm from './AddTaskForm';
import styles from './AddTaskModal.module.css';
import type { CreateTaskPayload } from '@/types/tasks';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTaskPayload) => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddTaskModalProps) {
  if (!isOpen) return null;

  const initialValues: CreateTaskPayload = {
    name: '',
    date: new Date().toISOString().slice(0, 10),
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <h2 className={styles.title}>
          <span className={styles.titleLine}>Нове</span>
          <span className={styles.desktopSpace}> </span>
          <span className={styles.titleLine}>завдання</span>
        </h2>

        <AddTaskForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </Modal>
  );
}