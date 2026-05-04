import { nextServer } from '../app/lib/api/api'

import {
    BackendTask,
    Task,
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

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await nextServer.get<BackendTask[]>('/api/tasks');
  return data.map(mapTaskFromBackend);
};

export const toggleTaskStatus = async ({
    id,
    isDone,
}: ToggleTaskStatusPayload):
    Promise<Task> => {
  const { data } = await nextServer.patch<BackendTask>(
    `/api/tasks/${id}/status`,
    { isDone });
    return mapTaskFromBackend( data );
};