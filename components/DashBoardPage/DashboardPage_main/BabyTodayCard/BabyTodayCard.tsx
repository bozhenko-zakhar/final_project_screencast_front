import css from "./BabyTodayCard.module.css";
import * as babyStates from "@/lehlehka.baby_states.json";
import cardStyles from "../../DashboardPage_main/DashboardPage_main.module.css";

const BabyTodayCard = () => {
  // Отримуємо перший елемент з масиву моків
  const data = babyStates[0];

  return (
    <section
      className={`${cardStyles.card} ${css.descriptionAboutBaby}`}
    >
      <div className={css.aboutBabyContainer}>
        <h2 className={css.babyContainerHeaderline}>Малюк сьогодні</h2>
        <div className={css.babyDescriptionContainer}>
          <img
            className={css.babyContainerImg}
            src={data.image}
            alt={data.image}
          />
          <div className={css.babyDescription}>
            <p className={css.titlesOfBabyToday}>
              Розмір:
              <span className={css.babyDescriptionText}>{data.babySize}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Вага:
              <span className={css.babyDescriptionText}>{data.babyWeight}</span>
            </p>
            <p className={css.titlesOfBabyToday}>
              Активність:
              <span className={css.babyDescriptionText}>{data.babyDevelopment}</span>
            </p>
          </div>
        </div>
        <div className={css.description}>
          <p className={css.babyDescriptionText}>{data.interestingFact}</p>
        </div>
      </div>
    </section>
  );
};

export default BabyTodayCard;