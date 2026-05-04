import css from "./BabyMomToggle.module.css";

export default function BabyMomToggle({ mode, setMode }) {
  return (
    <div className={css.toggle}>
      <button
        onClick={() => setMode("baby")}
        className={`${css.babyMomButton} ${
          mode === "baby" ? css.active : ""
        }`}
      >
        Розвиток малюка
      </button>
      <button onClick={() => setMode("mom")} className={`${css.babyMomButton} ${
          mode === "mom" ? css.active : ""
        }`}>
        Тіло мами
      </button>
    </div>
  );
}
