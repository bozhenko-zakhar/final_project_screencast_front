import { nextServer } from './api'
// або твій axios instance
import {
    BackendTask,
    Task,
    CreateTaskPayload,
    ToggleTaskStatusPayload
} from "@/app/types/tasks";

const mapTaskFromBackend = (task: BackendTask): Task => {
  return {
    id: task._id,
    userId: task.userId,
    date: task.date,
    title: task.name,
    isCompleted: task.isDone,
  };
};

// GET /tasks – всі задачі користувача
export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await nextServer.get<BackendTask[]>('/api/tasks');
  return data.map(mapTaskFromBackend);
};

// POST /tasks – створення нового завдання
export const createTask = async (payload: CreateTaskPayload):
    Promise<Task> => {
  const { data } = await nextServer.post<BackendTask>('/api/tasks', payload);
  return mapTaskFromBackend(data);
};

// PATCH /tasks/:id – зміна статусу
export const toggleTaskStatus = async ({
    id,
    isDone,
}: ToggleTaskStatusPayload):
    Promise<Task> => {
  const { data } = await nextServer.patch<BackendTask>(`/api/tasks/${id}`, { isDone });
    return mapTaskFromBackend( data );
};