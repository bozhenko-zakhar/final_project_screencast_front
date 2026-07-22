"use client";

import css from "./JourneyDetails.module.css";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";

import BabyDevelopment from "@/components/JourneyComponents/BabyDevelopment/BabyDevelopment";
import MomState from "@/components/JourneyComponents/MomState/MomState";
import TasksReminderCard from "@/components/DashBoardPage/DashboardPage_main/TasksReminderCard/TasksReminderCard";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import BabyMomToggle from "@/components/JourneyComponents/BabyMomToggle/BabyMomToggle";
import WeekSelector from "@/components/JourneyComponents/WeekSelector/WeekSelector";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentWeek } from "@/lib/api/services/getCurrentWeek";
import { useRouter } from "next/navigation";

import { getBabyStateInfo, getMomStateInfo } from "@/lib/api/clientApi/weeks";

type Props = {
  weekNumber: number;
};

const JourneyDetails = ({ weekNumber }: Props) => {
  const [mode, setMode] = useState<"baby" | "mom">("baby");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { currentWeek: userCurrentWeek } = getCurrentWeek(user);

  const selectedWeek = Math.min(weekNumber, userCurrentWeek);

  const { data: babyData, isError: babyError } = useQuery({
    queryKey: ["baby", selectedWeek],
    queryFn: () => getBabyStateInfo(selectedWeek),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const { data: momData, isError: momError } = useQuery({
    queryKey: ["mom", selectedWeek],
    queryFn: () => getMomStateInfo(selectedWeek),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const hasError = babyError || momError;

  useEffect(() => {
    if (hasError) {
      toast.error("Failed to fetch data");
    }
  }, [hasError]);

  const handleWeekChange = (week: number) => {
    if (week > userCurrentWeek) return;
    router.replace(`/journey/${week}`);
  };

  if (hasError) {
    return <p>Failed to fetch data</p>;
  }

  return (
    <main className={css.main}>
      <GreetingBlock />

      <WeekSelector
        userCurrentWeek={userCurrentWeek}
        viewWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />

      <section className={css.journeySection}>
        <BabyMomToggle
          mode={mode}
          setBabyMode={() => setMode("baby")}
          setMomMode={() => setMode("mom")}
        />

        {mode === "baby" ?
          <BabyDevelopment data={babyData} />
        : <div className={css.momBodyChange}>
            <MomState data={momData} />
            <TasksReminderCard />
          </div>
        }
      </section>
    </main>
  );
};

export default JourneyDetails;
