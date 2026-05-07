"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface DiaryLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
}

export default function DiaryLayout({
  children,
  details,
}: DiaryLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        {children}
      </div>

      <aside className="w-[400px] border-l">
        {details}
      </aside>
    </div>
  );
}