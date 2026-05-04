type Feeling = {
	states: string[],
	sensationDescr: string,
}

type ComfortTip = {
	category: string,
	tip: string
}

export interface MomWeek {
	weekNumber: string,
	feelings: Feeling,
	comfortTips: ComfortTip[]
}