import css from "./DashBoardPage.module.css";

import * as babyStates from "../../lehlehka.baby_states.json";

export async function DashBoardPage() {
  const data = babyStates[0];

  return (
    <div className={css.pageContainer}>
      <div className={css.dashboardContainer}>
        <div className={css.daysCountContainer}>
          <div className={css.weeks}>
            <p className={css.title}>Тиждень</p>
            <h3 className={css.days}>{data.weekNumber}</h3>
          </div>
          <div className={css.weeks}>
            <p className={css.title}>Днів до зустрічі</p>

            <h3 className={css.days}>~165</h3>
          </div>
        </div>
        <div className={css.babyTodayContainer}>
          <div className={css.babyTodayWrap}>
            <div className={css.descriptionAboutBaby}>
              <div className={css.aboutBabyContainer}>
                <h2 className={css.babyContainerHeaderline}>Малюк сьогодні</h2>
                <div className={css.babyDescriptionContainer}>
                  <img
                    className={css.babyContainerImg}
                    src={data.image}
                    alt="img"
                  />
                  <div className={css.babyDescription}>
                    <p className={css.titlesOfBabyToday}>
                      Розмір:
                      <span className={css.babyDescriptionText}>
                        {data.babySize}
                      </span>
                    </p>
                    <p className={css.titlesOfBabyToday}>
                      Вага:
                      <span className={css.babyDescriptionText}>
                        {data.babyWeight}
                      </span>
                    </p>
                    <p className={css.titlesOfBabyToday}>
                      Активність:
                      <span className={css.babyDescriptionText}>
                        {data.babyActivity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={css.description}>
                  <p className={css.babyFactsText}>{data.babyDevelopment}</p>
                </div>
              </div>
            </div>
            <div className={css.advicesForMom}>
              <div className={css.advicesForMomWrap}>
                <h3 className={css.babyContainerHeaderline}>Порада для мами</h3>
                <p className={css.babyFactsText}>{data.momDailyTips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
