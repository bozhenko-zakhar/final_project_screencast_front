import css from "./BabyMomToggle.module.css";

type Props = {
	// ось тут вони достаються із типом () => void,
	// бо інакше там був би тип Dispatch<SetStateAction<"baby" | "mom">>,
	// або ще якийсь не стандартний, а так зробив, як у конспекті
	mode: "baby" | "mom",
	setBabyMode: () => void; 
	setMomMode: () => void;
}

export default function BabyMomToggle({ mode, setBabyMode, setMomMode }: Props) {
  return (
    <div className={css.toggle}>
      <button
        onClick={setBabyMode}
        className={`${css.babyMomButton} ${
          mode === "baby" ? css.active : ""
        }`}
      >
        Розвиток малюка
      </button>
      <button onClick={setMomMode} className={`${css.babyMomButton} ${
          mode === "mom" ? css.active : ""
        }`}>
        Тіло мами
      </button>
    </div>
  );
}
