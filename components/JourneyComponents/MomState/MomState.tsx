import css from './MomState.module.css';
import Image from 'next/image';
import forkImage from "../../../app/(private routes)/journey/[weekNumber]/img/fork_spoon.svg"
import fitnessImage from "../../../app/(private routes)/journey/[weekNumber]/img/fitness_center.svg"
import sofaImage from "../../../app/(private routes)/journey/[weekNumber]/img/chair.svg"
import { MomWeek } from '@/types/mom';

type Props = {
	data: MomWeek | undefined
}

export default function MomState({data}: Props) {
    return (
        <>
            <div className={css.container}>
            
              <div className={css.momBodySection}>
            
        <div className={css.possibleFeelings}>
          <p className={css.feelingsHeader}>Як ви можете почуватись</p>

          <ul className={css.feelingsList}>
            <li className={css.feeling}>{data?.feelings.states[0]}</li>

            <li className={css.feeling}>{data?.feelings.states[1]}</li>

            <li className={css.feeling}>{data?.feelings.states[2]}</li>
          </ul>

          <p className={css.feelingDescr}>{data?.feelings.sensationDescr}</p>
        </div>

        <div className={css.adviceSection}>
          <p className={css.adviceHeader}>Поради для вашого комфорту</p>

          <ul className={css.adviceList}>
            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
                <Image
                  src={forkImage}
                  alt="fork-and-spoon-icon"
                  width={24}
                  height={24}
                />

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data?.comfortTips[0].category}
                  </p>

                  <p className={css.adviceDescr}>
                    {data?.comfortTips[0].tip}
                  </p>
                </div>
              </div>
            </li>

            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
                <Image
                  src={fitnessImage}
                  alt="fitness-icon"
                  width={24}
                  height={24}
                />

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data?.comfortTips[1].category}
                  </p>

                  <p className={css.adviceDescr}>{data?.comfortTips[1].tip}</p>
                </div>
              </div>
            </li>

            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
             <Image
                  src={sofaImage}
                  alt="sofa-icon"
                  width={24}
                  height={24}
                />

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data?.comfortTips[2].category}
                  </p>

                  <p className={css.adviceDescr}>{data?.comfortTips[2].tip}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </div>
       
      </div>
      </>
    )
}