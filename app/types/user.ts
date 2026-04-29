export interface User {
  id: string;
  name: string;
  email: string;
  gender?: "boy" | "girl" | null;
  dueDate?: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name: string;
  email: string;
  gender: "boy" | "girl" | null;
  dueDate: string | null;
}

export interface FormValues {
  name: string;
  email: string;
  gender: "" | "boy" | "girl";
  dueDate: string;
}
