import css from './BabyDevelopment.module.css'
import Image from "next/image";
import starImage from "../../img/star_shine.svg";

type BabyDevelopmentData = {
  image: string;
  analogy: string;
  babyDevelopment: string;
  interestingFact: string;
};

type Props = {
  data: BabyDevelopmentData;
};

export default function BabyDevelopment({ data }: Props) {
  if (!data) return null;
  return (
    <div className={css.babyDevelopment}>
      <div className={css.imgSection}>
        <Image
          src={data.image}
          alt="baby-image"
          className={css.babyImage}
          width={287}
          height={379}
        />
        <p className={css.imageDescr}>{data.analogy}</p>
      </div>
      <div className={css.descrSection}>
        <p className={css.descrText}>{data.babyDevelopment}</p>

        <div className={css.interestingFact}>
          <div className={css.factHeaderContainer}>
            <Image
              src={starImage}
              className={css.svgFact}
              width={24}
              height={24}
              alt="star_shine"
            />
            <p className={css.factHeader}>Цікавий факт тижня</p>
          </div>
          <p className={css.factText}>
            {data.interestingFact}
          </p>
        </div>
      </div>
    </div>
  );
}
