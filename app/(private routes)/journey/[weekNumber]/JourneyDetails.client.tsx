"use client";

import css from "./JourneyDetails.module.css";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

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
  const userCurrentWeek = weekNumber;
  const [selectedWeek, setSelectedWeek] = useState<number>(userCurrentWeek);

  // Baby query
  const {
    data: babyData,
    isLoading: babyLoading,
    isError: babyError,
    // isFetching: babyFetching,
  } = useQuery({
    queryKey: ["baby", selectedWeek],
    queryFn: () => getBabyStateInfo(selectedWeek),
    // placeholderData: keepPreviousData,
  });

  // Mom query
  const {
    data: momData,
    isLoading: momLoading,
    isError: momError,
    // isFetching: momFetching,
  } = useQuery({
    queryKey: ["mom", selectedWeek],
    queryFn: () => getMomStateInfo(selectedWeek),
    // placeholderData: keepPreviousData,
  });

  const data = mode === "baby" ? babyData : momData;

  // const isUpdating = babyFetching || momFetching;
  
  

const isLoading = babyLoading || momLoading;

  if (babyError || momError) {
    toast.error("Failed to fetch data");
    return <p>Failed to fetch data</p>;
  }

  const handleWeekChange = (week: number) => {
    setSelectedWeek(week);
    window.history.replaceState(null, "", `/journey/${week}`);
  };

  return (
    <>
    <div className={css.journeyWrapper}>
      <Toaster position="top-right" />

      <GreetingBlock />

      <WeekSelector
        userCurrentWeek={userCurrentWeek}
        viewWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />

      <section className={css.journeySection}>
        <BabyMomToggle mode={mode} setMode={setMode} />
          {isLoading && (
        <span className={css.loader}></span>
      )}

        {mode === "baby" ? (
          <BabyDevelopment data={data} />
        ) : (
          <div className={css.momBodyChange}>
            <MomState data={data} />
            <TasksReminderCard />
          </div>
        )}
      </section>
      </div>
    </>
  );
};

export default JourneyDetails;


