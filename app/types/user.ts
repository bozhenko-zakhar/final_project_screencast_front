export interface User {
  id: string;
  username: string;
  email: string;
  gender?: "boy" | "girl" | null;
  dueDate?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  username: string;
  email: string;
  gender: "boy" | "girl" | null;
  dueDate: string | null;
}

export interface FormValues {
  username: string;
  email: string;
  gender: "" | "boy" | "girl";
  dueDate: string;
}
