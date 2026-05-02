import { nextServer } from './api'
// або твій axios instance
import { Task, CreateTaskPayload, ToggleTaskStatusPayload } from "@/app/types/tasks";

// GET /tasks – всі задачі користувача
export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await nextServer.get<Task[]>('/tasks');
  return data;
};

// POST /tasks – створення нового завдання
export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await nextServer.post<Task>('/tasks', payload);
  return data;
};

// PATCH /tasks/:id – зміна статусу
export const toggleTaskStatus = async (
  payload: ToggleTaskStatusPayload,
): Promise<Task> => {
  const { id, isCompleted } = payload;
  const { data } = await nextServer.patch<Task>(`/tasks/${id}`, { isCompleted });
  return data;
};