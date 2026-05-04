export interface BackendTask {
  _id: string;
  userId: string;
  date: string;
  name: string;
  isDone: boolean;
  __v: number;
}

export interface Task {
    id: string;
    userId: string;
    date: string;
    title: string;
    isCompleted: boolean;
}

export interface CreateTaskPayload {
    name: string;
  // якщо бекенд очікує дату створення з фронта:
    date?: string;
}

export interface ToggleTaskStatusPayload {
  id: string;
  isDone: boolean;
}