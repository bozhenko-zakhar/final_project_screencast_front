export interface User {
  id: string;
  name: string;
  email: string;
  gender?: "boy" | "girl" | null;
  dueDate?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  newEmail?: string;
  gender?: "boy" | "girl" | null;
  date?: string | null;
}

export interface FormValues {
  username: string;
  email: string;
  gender: "" | "boy" | "girl";
  dueDate: string;
}
