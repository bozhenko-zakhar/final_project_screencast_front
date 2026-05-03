// "use client";

// import { useRouter } from "next/navigation";
// import css from "./WeekSelector.module.css";
// import { useState } from "react";

// type WeekSelectorProps = {
//   currentWeek: number;
// };

// export default function WeekSelector({
//   currentWeek =
// }: WeekSelectorProps) {
  
//   const router = useRouter();

//   const weeks = Array.from({ length: 40 }, (_, i) => i + 1);
//   // currentWeek = weeks[10];



//   return (
//     <div className={css.wrapper}>
//       {weeks.map((week) => {
//         const isCurrent = week === currentWeek;
//         const isActive = week <= currentWeek;
//         const isDisabled = week > currentWeek;

//         return (
//           <button 
//             key={week}
//                 ref={(el) => {
//               //  auto-scroll current week when it renders
//               if (isCurrent && el) {
//                 el.scrollIntoView({
//                   behavior: "smooth",
//                   inline: "center",
//                   block: "nearest",
//                 });
//               }
//             }}
//             className={`
//               ${css.button}
//               ${isCurrent ? css.active : ""}
//               ${isActive ? css.button : ""}
//               ${isDisabled ? css.disabled : ""}
//             `}
//             disabled={isDisabled}
//             onClick={() => {
//               if (isDisabled) return;
//               router.push(`/journey/${week}`);
//             }}
//             onMouseEnter={() => {
//               if (!isDisabled) {
//                 router.prefetch(`/journey/${week}`);
//               }
//             }}
//           >
//             <span className={css.number}>{week}</span>
//             Тиждень
//           </button>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import css from "./WeekSelector.module.css";

type WeekSelectorProps = {
  userCurrentWeek: number; // real pregnancy week
  viewWeek: number;        // current URL week
};

export default function WeekSelector({
  userCurrentWeek,
  viewWeek,
}: WeekSelectorProps) {
  const router = useRouter();

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className={css.wrapper}>
      {weeks.map((week) => {
        const isUserWeek = week === userCurrentWeek;
        const isSelectedWeek = week === viewWeek;
        const isPastOrCurrent = week <= userCurrentWeek;
        const isFuture = week > userCurrentWeek;

        return (
          <button
            key={week}
            disabled={isFuture}
            className={`
              ${css.button}
              ${isSelectedWeek ? css.active : ""}
              ${isUserWeek ? css.active : ""}
              ${isFuture ? css.disabled : ""}
            `}
            ref={(el) => {
              // center USER current week (not view week)
              if (isUserWeek && el) {
                el.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }
            }}
            onClick={() => {
              if (isFuture) return;
              router.push(`/journey/${week}`);
            }}
            onMouseEnter={() => {
              if (!isFuture) {
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




