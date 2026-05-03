
"use client";

import css from "./JourneyDetails.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Image from "next/image";
import babyImage from "../../../components/img/Rectangle 1.png";
import BabyDevelopment from "@/app/components/JourneyComponents/BabyDevelopment/BabyDevelopment";
import MomState from "@/app/components/JourneyComponents/MomState/MomState";
import TasksReminderCard from "@/app/components/TasksReminderCard/TasksReminderCard";
import GreetingBlock from "@/app/components/GreetingBlock/GreetingBlock";
import BabyMomToggle from "@/app/components/JourneyComponents/BabyMomToggle/BabyMomToggle";
import WeekSelector from "@/app/components/JourneyComponents/WeekSelector/WeekSelector";

export async function getCurrentWeek() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/private`
  );

  return res.data.currentWeek as number;
}


export async function getMomStateInfo(weekNumber?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/mom-state`;

  console.log(process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await axios.get(url, {
      params: {
        weekNumber,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch mom state info");
  }
}

export async function getBabyStateInfo(weekNumber?: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/weeks/baby-state`;

  console.log(process.env.NEXT_PUBLIC_API_URL);

  try {
    const res = await axios.get(url, {
      params: {
        weekNumber,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch baby state info");
  }
}

type JourneyDetailsProps = {
  weekNumber?: number;
};

const JourneyDetails = ({ weekNumber }: JourneyDetailsProps) => {
  const [mode, setMode] = useState("baby");
  const [selectedWeek, setSelectedWeek] = useState();

//    const { data: userCurrentWeek } = useQuery({
//     queryKey: ["current-week"],
//     queryFn: ()=> getCurrentWeek(),
//  });

const userCurrentWeek = 16;

const handleClick = (newWeek) => {
  setSelectedWeek(newWeek);
}

  const {
    data: babyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["baby", weekNumber],
    queryFn: () => getBabyStateInfo(weekNumber),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { data: momData } = useQuery({
    queryKey: ["mom", weekNumber],
    queryFn: () => getMomStateInfo(weekNumber),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const data = mode === "baby" ? babyData : momData;

  useEffect(() => {
    if (isError) {
      import("izitoast").then((iziToast) => {
        iziToast.default.error({
          title: "Error",
          message: "Failed to fetch data",
          position: "topRight",
        });
      });
    }
  }, [isError]);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Failed to fetch data</p>;
  }

  return (
    <>
      <GreetingBlock />

      <WeekSelector userCurrentWeek={userCurrentWeek} viewWeek={selectedWeek} onClick={selectedWeek}/>
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

