"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DiaryListItem } from "@/types/diary";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  entry: DiaryListItem;
  onSelectEntry?: (entryId: string) => void;
}

const DiaryEntryCard = ({ entry, onSelectEntry }: DiaryEntryCardProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleCardClick = () => {
    if (isMobile) {
      router.push(`/diary/${entry.id}`);
    } else {
      onSelectEntry?.(entry.id);
    }
  };

  const formattedDate = new Date(entry.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={css.card} onClick={handleCardClick} role="button" tabIndex={0}>
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