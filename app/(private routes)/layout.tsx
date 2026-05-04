"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";

import Breadcrumbs from "@/components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "@/components/Layout/Header/Header";
import SideBar from "@/components/Layout/SideBar/SideBar";

import { useAuthStore } from "@/lib/store/authStore";

import { getMe } from "@/lib/api/clientApi";

import css from "./layout.module.css"

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function PrivateLayoutContent({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  useEffect(() => {
    const gender = user?.gender;

    document.body.dataset.theme =
      gender === "girl" || gender === "boy" ? gender : "neutral";
  }, [user?.gender]);

  return (
    <div className={css.container}>
      <Header setBarActive={() => setIsMobileMenuOpen(true)} />
      <SideBar
        isOpen={isMobileMenuOpen}
        setBarInactive={() => setIsMobileMenuOpen(false)}
      />
      <Breadcrumbs />
      {children}
    </div>
  );
}

export default function LehlehkaLayout({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivateLayoutContent>{children}</PrivateLayoutContent>
    </QueryClientProvider>
  );
}
