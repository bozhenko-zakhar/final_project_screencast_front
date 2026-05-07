import { create } from "zustand";

interface LoadingStore {
  activeRequests: Set<string>;
  addRequest: (id: string) => void;
  removeRequest: (id: string) => void;
  isLoading: boolean;
}

export const useLoadingStore = create<LoadingStore>()((set) => ({
  activeRequests: new Set(),
  isLoading: false,

  addRequest: (id: string) => {
    set((state) => {
      const newRequests = new Set(state.activeRequests);
      newRequests.add(id);
      return {
        activeRequests: newRequests,
        isLoading: newRequests.size > 0,
      };
    });
  },

  removeRequest: (id: string) => {
    set((state) => {
      const newRequests = new Set(state.activeRequests);
      newRequests.delete(id);
      return {
        activeRequests: newRequests,
        isLoading: newRequests.size > 0,
      };
    });
  },
}));
