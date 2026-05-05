"use client";

import css from "./JourneyDetails.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import BabyDevelopment from "@/components/JourneyComponents/BabyDevelopment/BabyDevelopment";
import MomState from "@/components/JourneyComponents/MomState/MomState";
import TasksReminderCard from "@/components/DashBoardPage/DashboardPage_main/TasksReminderCard/TasksReminderCard";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import BabyMomToggle from "@/components/JourneyComponents/BabyMomToggle/BabyMomToggle";
import WeekSelector from "@/components/JourneyComponents/WeekSelector/WeekSelector";

import { getBabyStateInfo, getMomStateInfo } from "@/lib/api/clientApi/weeks";

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
  } = useQuery({
    queryKey: ["baby", selectedWeek],
    queryFn: () => getBabyStateInfo(selectedWeek),
    placeholderData: keepPreviousData,
  });

  // Mom query
  const {
    data: momData,
    isLoading: momLoading,
    isError: momError,
  } = useQuery({
    queryKey: ["mom", selectedWeek],
    queryFn: () => getMomStateInfo(selectedWeek),
    placeholderData: keepPreviousData,
  });

  if (babyLoading || momLoading) {
    return <p>Loading, please wait...</p>;
  }

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
      <Toaster position="top-right" />

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
				/> {/* Я не змінював функції, а додав одну так, по класичному, щоби лінтер не видавав помилку */}

        {mode === "baby" ? (
          <BabyDevelopment data={babyData} />
        ) : (
          <div className={css.momBodyChange}>
            <MomState data={momData} />
            <TasksReminderCard />
          </div>
        )}
      </section>
    </>
  );
};

export default JourneyDetails;