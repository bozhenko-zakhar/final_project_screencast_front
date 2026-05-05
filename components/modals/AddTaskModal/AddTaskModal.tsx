'use client';

import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import Modal from '../Modal/Modal';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type AddTaskFormValues = {
  name: string;
  date: string;
};

const TEMP_ACCESS_TOKEN = '';

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const handleSubmit = async (values: AddTaskFormValues) => {
    try {
      console.log('Sending task:', values);

      const response = await axios.post(
        'http://localhost:3000/api/tasks',
        values,
        {
          headers: {
            Authorization: `Bearer ${TEMP_ACCESS_TOKEN}`,
          },
        },
      );

      console.log('Task created successfully:', response.data);

      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Create task error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }

      alert('Помилка при створенні задачі');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <AddTaskForm onSubmit={handleSubmit} />
    </Modal>
  );
}
