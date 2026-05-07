"use client";

import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
    if (typeof data === "string") return data;
  }
  if (error instanceof Error) return error.message;
  return "Помилка запиту";
};

export const showErrorToast = (error: unknown) => {
  toast.error(getErrorMessage(error));
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};
