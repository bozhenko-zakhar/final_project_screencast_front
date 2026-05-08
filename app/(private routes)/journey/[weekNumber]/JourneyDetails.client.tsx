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

import {
  fetchPrivateWeeks,
  getBabyStateInfo,
  getMomStateInfo,
} from "@/lib/api/clientApi/weeks";
import { redirect, useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import { getCurrentWeek } from "@/lib/services/getCurrentWeek";

type Props = {
  weekNumber: number;
};

const JourneyDetails = ({ weekNumber }: Props) => {
  const [mode, setMode] = useState<"baby" | "mom">("baby");
  const [selectedWeek, setSelectedWeek] = useState<number>(weekNumber);

  const {
    data: babyData,
    isLoading: babyLoading,
    isError: babyError,
    // isFetching: babyFetching,
  } = useQuery({
    queryKey: ["baby", selectedWeek, mode],
    queryFn: () => getBabyStateInfo(selectedWeek),
    // placeholderData: keepPreviousData,
  });

  const {
    data: momData,
    isLoading: momLoading,
    isError: momError,
    // isFetching: momFetching,
  } = useQuery({
    queryKey: ["mom", selectedWeek, mode],
    queryFn: () => getMomStateInfo(selectedWeek),
    // placeholderData: keepPreviousData,
  });

  const hasError = babyError || momError;

  useEffect(() => {
    if (hasError) {
      toast.error("Failed to fetch data");
    }
  }, [hasError]);

  const handleWeekChange = (week: number) => {
    setSelectedWeek(week);
    window.history.replaceState(null, "", `/journey/${week}`);
  };

  if (babyLoading || momLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (hasError) {
    return <p>Failed to fetch data</p>;
  }

  return (
    <>
      <GreetingBlock />

      <WeekSelector
        userCurrentWeek={weekNumber}
        viewWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />

      <section className={css.journeySection}>
        <BabyMomToggle
          mode={mode}
          setBabyMode={() => setMode("baby")}
          setMomMode={() => setMode("mom")}
        />

        {mode === "baby" ? (
          <BabyDevelopment data={babyData} />
        ) : (
          momData ? (
          <div className={css.momBodyChange}>
            <MomState data={momData} />
            <TasksReminderCard />
          </div>) : null
        )}
      </section>
      </div>
    </>
  );
};

export default JourneyDetails;


