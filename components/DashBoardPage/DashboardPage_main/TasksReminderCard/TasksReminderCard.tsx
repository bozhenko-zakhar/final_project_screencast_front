'use client';

import { useEffect, useState } from 'react';
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

import AddTaskModal from '@/components/modals/AddTaskModal/AddTaskModal';
import EmojiLoader from '@/components/EmojiLoader/EmojiLoader';
import { Button } from '@/components/Button/Button';

const TasksReminderCard = () => {
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

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити завдання', {id: 'tasks-fetch-error'});
    }
  }, [isError]);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Завдання створено');
      setIsAddModalOpen(false);
    },
    onError: () => {
      toast.error('Не вдалося створити завдання');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Не вдалося оновити завдання');
    },
  });

  const handleCreateTaskClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }

    setIsAddModalOpen(true);
  };

  const handleTaskCreate = async (values: CreateTaskPayload) => {
    await createTaskMutation.mutateAsync(values);
  };

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
    <div
      className={`${cardStyles.card} ${cardStyles.tasksHeight} ${styles.tasks}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleCreateTaskClick}
          aria-label="Створити завдання"
        >
          <svg className={styles.iconButtonIcon} aria-hidden="true">
            <use href="/sprite.svg#add_circle" />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        {isLoading && <EmojiLoader />}

        {!isLoading && !isError && !hasTasks && (
          <div className={styles.placeholder}>
            <p className={styles.noTasksTitle}>Наразі немає жодних завдань</p>
            <p className={styles.noTasksText}>Створіть мершій нове завдання!</p>
            
            <Button className={styles.createButton} onClick={handleCreateTaskClick}>
              Створити завдання
            </Button>
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
                  <span className={styles.taskDate}>
                    {new Date(task.date).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={task.isCompleted}
                      disabled={isThisPending}
                      onChange={() => handleToggleTask(task)}
                    />
                    <span className={styles.checkboxBox} aria-hidden="true">
                      {isThisPending ? (
                         <span className={styles.spinner} />
                      ) : (
                          <svg className={styles.checkboxIcon}>
                            <use href="/sprite.svg#check" />
                          </svg>
                      )}   
                    </span>
                    <span className={task.isCompleted ? styles.taskCompleted : styles.taskText}>
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
        onSubmit={handleTaskCreate}
        isSubmitting={createTaskMutation.isPending}
      />
    </div>
  );
};

export default TasksReminderCard;