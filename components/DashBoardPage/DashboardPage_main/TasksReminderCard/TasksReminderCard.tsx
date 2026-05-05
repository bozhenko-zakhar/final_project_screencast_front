'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import styles from './TasksReminderCard.module.css';
import cardStyles from '../../DashboardPage_main/DashboardPage_main.module.css';

import { useAuthStore } from '@/lib/store/authStore';

import {
  createTask,
  fetchTasks,
  toggleTaskStatus,
} from '@/lib/api/clientApi/tasks';

import type { CreateTaskPayload, Task } from '@/types/tasks';

import PregnancyLoader from '@/components/Loading/PregnancyLoader';
import AddTaskModal from '@/components/modals/AddTaskModal/AddTaskModal';
import EmojiLoader from '@/components/EmojiLoader/EmojiLoader';

interface TasksReminderCardProps {
  babyImageUrl?: string;
}

const TasksReminderCard = ({ babyImageUrl }: TasksReminderCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: isAuthenticated,
  });

  const createTaskMutation = useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Завдання створено');
      setIsAddModalOpen(false);
    },
    onError: () => {
      toast.error('Не вдалося створити завдання');
    },
  });

  // 2. Мутація зміни статусу (чекбокс)
  const toggleStatusMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Статус завдання оновлено');
    },
    onError: () => {
      toast.error('Не вдалося оновити завдання');
    },
  });

  // 3. Клік по "+"/"Створити завдання"
  const handleCreateTaskClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }

    setIsAddModalOpen(true);
  };

  const handleTaskCreate = (values: CreateTaskPayload) => {
    createTaskMutation.mutate(values);
  };

  //6. Клік по чекбоксу
  const handleToggleTask = (task: Task) => {
    toggleStatusMutation.mutate({
      id: task.id,
      isDone: !task.isCompleted,
    });
  };

  const hasTasks = tasks.length > 0;

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section
      className={`${cardStyles.card} ${cardStyles.cardFixedHeight} ${styles.tasks}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleCreateTaskClick}
          aria-label="Створити завдання"
        >
          +
        </button>
      </div>

      <div className={styles.content}>
        {isLoading && <EmojiLoader />}
        
        {!isLoading && isError &&
          <p>Сталася помилка при завантаженні завдань.</p>
        }

        {!isLoading && !isError && !hasTasks && (
          <div className={styles.placeholder}>
            <p className={styles.noTasksTitle}>Наразі немає жодних завдань</p>
            <p className={styles.noTasksText}>Створіть перше нове завдання!</p>
            <button
              type="button"
              className={styles.createButton}
              onClick={handleCreateTaskClick}
            >
              Створити завдання
            </button>
          </div>
        )}

        {!isLoading && !isError && hasTasks && (
          <ul className={styles.list}>
            {sortedTasks.map((task) => {
              const isThisPending =
                toggleStatusMutation.isPending &&
                toggleStatusMutation.variables?.id === task.id;

              return (
                <li key={task.id} className={styles.item}>
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      disabled={isThisPending}
                      onChange={() => handleToggleTask(task)}
                    />
                    <span
                      className={
                        task.isCompleted ? styles.taskCompleted : undefined
                      }
                    >
                      {task.title}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        // task={null}
        // onSubmit={handleTaskCreate}
        // isSubmitting={createTaskMutation.isPending}
      />
      {/* TODO: підключити коли AddTaskModal буде готовий
      {isAddModalOpen && (
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      */}
    </section>
  );
};

export default TasksReminderCard;