'use client';

import { useRouter } from 'next/navigation';

import styles from './TasksReminderCard.module.css';
import cardStyles from '../../DashboardPage_main/DashboardPage_main.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { createTask, fetchTasks, toggleTaskStatus } from '@/app/lib/api/tasksClientApi';
import { CreateTaskPayload, Task } from '@/app/types/tasks';
import toast from 'react-hot-toast';
import PregnancyLoader from '@/components/Loading/PregnancyLoader';


interface TasksReminderCardProps {
  babyImageUrl?: string;
}
  
const TasksReminderCard = ({babyImageUrl}: TasksReminderCardProps) => {

  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 1. Список завдань лише для авторизованого користувача
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: isAuthenticated, // гість не робить запитів
  });

  // 2. Мутація створення завдання
  // const createTaskMutation = useMutation({
  //   mutationFn: (payload: CreateTaskPayload) => createTask(payload),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //     toast.success("Завдання створено");
  //     setIsAddModalOpen(false);
  //   },
  //   onError: () => {
  //     toast.error('Не вдалося створити завдання');
  //   },
  // });

  // 3. Мутація зміни статусу (чекбокс)
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
  // 4. Клік по "+"/"Створити завдання"
  const handleCreateTaskClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }
    setIsAddModalOpen(true);
  };

  // 5. Submit з модалки (назва + дата) підключити її як onSubmit у компоненті модалки
  //бере дані з форми модалки і стартує запит “створити завдання” через React Query
  // const handleTaskCreate = (values: CreateTaskPayload) => {
  //   createTaskMutation.mutate(values);
  // };

  //6. Клік по чекбоксу
  const handleToggleTask = (task: Task) => {
    toggleStatusMutation.mutate({
      id: task.id,
      isCompleted: !task.isCompleted,
    });
  };

  const hasTasks = tasks.length > 0;

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
        {isLoading && <PregnancyLoader imageUrl={ babyImageUrl } />}
        
        {!isLoading && isError &&
          <p>Сталася помилка при завантаженні завдань.</p>
        }

        {!isLoading && !isError && !hasTasks && (
          <div className={styles.placeholder}>
            <p className={styles.noTasksTitle}>Наразі немає жодних завдань</p>
            <p className={styles.noTasksText}>Створіть мершій нове завдання!</p>
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
            {tasks.map((task) => {
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
                    <span className={
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
    </section>
  );
};

export default TasksReminderCard;