import { nextServer } from '../api';

import type {
  BackendTask,
  CreateTaskPayload,
  Task,
  ToggleTaskStatusPayload,
} from '@/types/tasks';

type TaskResponse = {
  data: BackendTask;
};

const mapTaskFromBackend = (task: BackendTask): Task => ({
  id: task._id,
  userId: task.userId,
  date: task.date,
  title: task.name,
  isCompleted: task.isDone,
});

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await nextServer.get<BackendTask[]>('/tasks', {
		metadata: {
			showGlobalLoader: false,
		},
	});

  return data
    .map(mapTaskFromBackend)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const createTask = async (
  payload: CreateTaskPayload
): Promise<Task> => {
  const { data } = await nextServer.post<TaskResponse>('/tasks', payload);

  return mapTaskFromBackend(data.data);
};

export const toggleTaskStatus = async ({
  id,
  isDone,
}: ToggleTaskStatusPayload): Promise<Task> => {
  const { data } = await nextServer.patch<TaskResponse>(
    `/tasks/${id}/status`,
    { isDone }, {
		metadata: {
			showGlobalLoader: false,
		},
	});

  return mapTaskFromBackend(data.data);
};