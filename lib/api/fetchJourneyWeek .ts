import { babyState } from "@/app/dataJson/baby_states"
import { momState } from "@/app/dataJson/mom_states"

export const fetchJourneyWeek = () => {
    return babyState[0];
}