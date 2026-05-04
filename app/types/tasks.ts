export interface BackendTask {
  _id: string;
  userId: string;
  date: string;
  name: string;
  isDone: boolean;
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
    date?: string;
}

export interface ToggleTaskStatusPayload {
  id: string;
  isDone: boolean;
}