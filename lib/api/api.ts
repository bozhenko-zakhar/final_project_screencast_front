import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useLoadingStore } from "@/lib/store/loadingStore";

// let requestCounter = 0;

declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: { requestId: string };
  }
}

export const nextServer = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const requestId = `request-${++requestCounter}`;
  config.metadata = { requestId };
  useLoadingStore.getState().addRequest(requestId);
  return config;
});

nextServer.interceptors.response.use(
  (response: AxiosResponse) => {
    const requestId = response.config.metadata?.requestId;
    if (requestId) useLoadingStore.getState().removeRequest(requestId);
    return response;
  },
  (error: AxiosError) => {
    const requestId = error.config?.metadata?.requestId;
    if (requestId) useLoadingStore.getState().removeRequest(requestId);
    return Promise.reject(error);
  }
);
