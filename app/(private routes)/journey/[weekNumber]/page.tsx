
"use client";

import css from "./JourneyDetails.module.css";
import axios from "axios";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import BabyDevelopment from "@/components/JourneyComponents/BabyDevelopment/BabyDevelopment";
import MomState from "@/components/JourneyComponents/MomState/MomState";
import TasksReminderCard from "@/components/DashBoardPage/DashboardPage_main/TasksReminderCard/TasksReminderCard";
import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import BabyMomToggle from "@/components/JourneyComponents/BabyMomToggle/BabyMomToggle";
import WeekSelector from "@/components/JourneyComponents/WeekSelector/WeekSelector";



export async function getCurrentWeek() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/private`
  );

  return res.data.currentWeek as number;
}

export async function getMomStateInfo(weekNumber: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/mom-state`;

  try {
    const res = await axios.get(url, {
      params: {
        weekNumber,
      },
    });

    return res.data;
  } catch {
    throw new Error("Failed to fetch mom state info");
  }
}

export async function getBabyStateInfo(weekNumber: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/baby-state`;

  try {
    const res = await axios.get(url, {
      params: {
        weekNumber,
      },
    });

    return res.data;
  } catch {
    throw new Error("Failed to fetch baby state info");
  }
}

type JourneyDetailsProps = {
  weekNumber?: number;
};

const JourneyDetails = ({ weekNumber }: JourneyDetailsProps) => {
  const [mode, setMode] = useState<"baby" | "mom">("baby");

// Коли буде логіка автентифікації, я використаю цей useQuery,
//  тому що getCurrentWeek проходить через авторизацію та поверне
//  поточний тиждень путентифікованоготкористувача.
// Зараз захардкодила 16 для наглядності

// const { data: userCurrentWeek } = useQuery({
//   queryKey: ["current-week"],
//   queryFn: getCurrentWeek,
// });
  const userCurrentWeek = 16;

  const [selectedWeek, setSelectedWeek] = useState<number>(
    weekNumber ?? userCurrentWeek
  );

  // Baby-query
  const {
    data: babyData,
    isLoading: babyLoading,
    isError: babyError,
  } = useQuery({
    queryKey: ["baby", selectedWeek],
    queryFn: () => getBabyStateInfo(selectedWeek),
    placeholderData: keepPreviousData,
  });

  // Mom-query
  const {
    data: momData,
    isLoading: momLoading,
    isError: momError,
  } = useQuery({
    queryKey: ["mom", selectedWeek],
    queryFn: () => getMomStateInfo(selectedWeek),
    placeholderData: keepPreviousData,
  });


  const data = mode === "baby" ? babyData : momData;


  if (babyLoading || momLoading) {
    return <p>Loading, please wait...</p>;
  }


  if (babyError || momError) {
    toast.error("Failed to fetch data");

    return <p>Failed to fetch data</p>;
  }

  // Week Change
  const handleWeekChange = (week: number) => {
    setSelectedWeek(week);

  //  Зміна url без перезавантаження сторінки
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
        <BabyMomToggle mode={mode} setMode={setMode} />

        {mode === "baby" ? (
          <BabyDevelopment data={data} />
        ) : (
          <div className={css.momBodyChange}>
            <MomState data={data} />
            <TasksReminderCard />
          </div>
        )}
      </section>
    </>
  );
};

export default JourneyDetails;


