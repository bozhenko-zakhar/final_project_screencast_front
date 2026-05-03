import css from './MomState.module.css';
import Image from 'next/image';

export default function MomState({data}) {
    // const data = momState[3];
    return (
        <>
            <div className={css.container}>
            
              <div className={css.momBodySection}>
            
        <div className={css.possibleFeelings}>
          <p className={css.feelingsHeader}>Як ви можете почуватись</p>

          <ul className={css.feelingsList}>
            <li className={css.feeling}>{data.feelings.states[0]}</li>

            <li className={css.feeling}>{data.feelings.states[1]}</li>

            <li className={css.feeling}>{data.feelings.states[2]}</li>
          </ul>

          <p className={css.feelingDescr}>{data.feelings.sensationDescr}</p>
        </div>

        <div className={css.adviceSection}>
          <p className={css.adviceHeader}>Поради для вашого комфорту</p>

          <ul className={css.adviceList}>
            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
                <Image
                  src="/img/fork_spoon.svg"
                  alt=""
                  width={24}
                  height={24}
                />

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data.comfortTips[0].category}
                  </p>

                  <p className={css.adviceDescr}>
                    {data.comfortTips[0].tip}
                  </p>
                </div>
              </div>
            </li>

            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
                <Image
                  src="/img/fitness_center.svg"
                  alt=""
                  width={24}
                  height={24}
                />

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data.comfortTips[1].category}
                  </p>

                  <p className={css.adviceDescr}>{data.comfortTips[1].tip}</p>
                </div>
              </div>
            </li>

            <li className={css.advice}>
              <div className={css.adviceTypeContainer}>
                <svg className={css.icon} width="24" height="24">
                  <use href="/img/sprite.svg#icon-chair" />
                </svg>

                <div className={css.text}>
                  <p className={css.adviceType}>
                    {data.comfortTips[2].category}
                  </p>

                  <p className={css.adviceDescr}>{data.comfortTips[2].tip}</p>
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