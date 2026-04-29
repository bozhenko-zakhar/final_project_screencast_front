"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import Header from "../components/Layout/Header/Header";

import css from "./layout.module.css";
import SideBar from "../components/Layout/SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function LehlehkaLayout({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.container}>
        <Header setBarActive={() => setIsMobileMenuOpen(true)} />
        <SideBar
          isOpen={isMobileMenuOpen}
          setBarInactive={() => setIsMobileMenuOpen(false)}
        />
        <Breadcrumbs />
        {children}
      </div>
    </QueryClientProvider>
  );
}
