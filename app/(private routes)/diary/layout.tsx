import css from "./layout.module.css"

interface DiaryLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
}

export default function DiaryLayout({
  children,
  details,
}: DiaryLayoutProps) {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        {children}
      </div>

      <aside className={`w-[400px] border-l ${css.is_desktop}`}>
        {details}
      </aside>
    </div>
  );
}