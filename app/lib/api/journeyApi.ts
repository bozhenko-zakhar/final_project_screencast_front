import axios from "axios";

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