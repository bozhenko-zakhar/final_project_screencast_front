import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useLoadingStore } from "@/lib/store/loadingStore";

let requestCounter = 0;
let refreshPromise: Promise<void> | null = null;

declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: {
      requestId?: string;
      showGlobalLoader?: boolean;
    };

    _retry?: boolean;
    skipAuthRefresh?: boolean;
  }
}

export const nextServer = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const requestId = `request-${++requestCounter}`;

  config.metadata = {
    requestId,
    showGlobalLoader: config.metadata?.showGlobalLoader ?? true,
  };

  if (config.metadata.showGlobalLoader) {
    useLoadingStore.getState().addRequest(requestId);
  }

  return config;
});

nextServer.interceptors.response.use(
  (response: AxiosResponse) => {
    const requestId = response.config.metadata?.requestId;

    if (requestId && response.config.metadata?.showGlobalLoader) {
      useLoadingStore.getState().removeRequest(requestId);
    }

    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const requestId = originalRequest?.metadata?.requestId;

    if (requestId) {
      useLoadingStore.getState().removeRequest(requestId);
    }

    if (error.response?.status === 401 && originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = nextServer
          .post("/auth/refresh")
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return nextServer(originalRequest);
    } catch (refreshError) {
      if (
        axios.isAxiosError(refreshError) &&
        refreshError.response?.status === 401
      ) {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }

      return Promise.reject(refreshError);
    }
  },
);
