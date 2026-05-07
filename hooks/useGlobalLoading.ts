"use client";

import { useLoadingStore } from "@/lib/store/loadingStore";

export const useGlobalLoading = () => {
  const { isLoading } = useLoadingStore();
  return { isLoading };
};
