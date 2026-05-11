"use client";

import { DiaryEntryDetail } from "@/types/diary";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  entry: DiaryEntryDetail;
  updateEditionalDiary: () => void;
  isActive: boolean;
}

const DiaryEntryCard = ({
  entry,
  updateEditionalDiary,
  isActive,
}: DiaryEntryCardProps) => {

  // const handleCardClick = () => {
  //   onSelectEntry?.(entry.id);
  // };

  const formattedDate = new Date(entry.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={`${css.card} ${isActive ? css.active : ""}`} onClick={updateEditionalDiary} role="button" tabIndex={0}>
      <div className={css.content}>
        <h3 className={css.title}>{entry.title}</h3>
        <p className={css.date}>{formattedDate}</p>
      </div>
      {entry.emotions && entry.emotions.length > 0 && (
        <div className={css.emotions}>
          {entry.emotions.map((emotion) => (
            <span key={emotion.id} className={css.emotionTag}>
              {emotion.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryEntryCard;
