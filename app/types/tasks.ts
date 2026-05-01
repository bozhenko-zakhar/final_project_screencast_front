export interface Task {
  id: string;
  title: string;
  createdAt: string;
  isCompleted: boolean;
}

export interface CreateTaskPayload {
  title: string;
  // якщо бекенд очікує дату створення з фронта:
  createdAt?: string;
}

export interface ToggleTaskStatusPayload {
  id: string;
  isCompleted: boolean;
}