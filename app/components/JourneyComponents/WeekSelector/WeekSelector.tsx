

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
  userCurrentWeek: number;
  viewWeek: number;
};

export default function WeekSelector({
  userCurrentWeek,
  viewWeek,
}: WeekSelectorProps) {
  const router = useRouter();

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  /**
   * 🎯 ACTIVE WEEK = what is currently selected in UI
   * first load → userCurrentWeek
   * after navigation → viewWeek
   */
  const activeWeek = viewWeek ?? userCurrentWeek;

  /**
   * store DOM nodes instead of single ref
   */
  const weekRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  /**
   * scroll whenever activeWeek changes
   */
  useEffect(() => {
    const el = weekRefs.current[activeWeek];

    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeWeek]);

  return (
    <div className={css.wrapper}>
      {weeks.map((week) => {
        const isCurrentUserWeek = week === userCurrentWeek;
        const isActive = week === activeWeek;
        const isFuture = week > userCurrentWeek;
        const isClickable = week <= userCurrentWeek;

        return (
          <button
            key={week}
            ref={(el) => {
              weekRefs.current[week] = el;
            }}
            disabled={!isClickable}
            className={`
              ${css.button}
              ${isActive ? css.active : ""}
              ${isCurrentUserWeek ? css.currentWeek : ""}
              ${isFuture ? css.disabled : ""}
            `}
            onClick={() => {
              if (!isClickable) return;

              if (week === activeWeek) return;

              router.push(`/journey/${week}`);
            }}
            onMouseEnter={() => {
              if (isClickable) {
                router.prefetch(`/journey/${week}`);
              }
            }}
          >
            <span className={css.number}>{week}</span>
            Тиждень
          </button>
        );
      })}
    </div>
  );
}




