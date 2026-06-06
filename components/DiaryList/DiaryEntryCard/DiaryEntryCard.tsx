"use client";

import { DiaryEntryDetail } from "@/types/diary";
import Link from "next/link";
import css from "./DiaryEntryCard.module.css";

interface DiaryEntryCardProps {
  entry: DiaryEntryDetail;
}

const DiaryEntryCard = ({ entry }: DiaryEntryCardProps) => {
  const formattedDate = new Date(entry.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={`${css.card}`}>
      <div className={css.desktop_content}>
        <Link href={`/diary/${entry._id}`}>
          <div className={css.content}>
            <h3 className={css.title}>{entry.title}</h3>
            <p className={css.date}>{formattedDate}</p>
          </div>
          {entry.emotions && entry.emotions.length > 0 && (
            <div className={css.emotions}>
              {entry.emotions.map((emotion) => (
                <span key={emotion._id} className={css.emotionTag}>
                  {emotion.title}
                </span>
              ))}
            </div>
          )}
        </Link>
      </div>

      <div className={css.non_desktop_content}>
        <a href={`/diary/${entry._id}`}>
          <div className={css.content}>
            <h3 className={css.title}>{entry.title}</h3>
            <p className={css.date}>{formattedDate}</p>
          </div>
          {entry.emotions && entry.emotions.length > 0 && (
            <div className={css.emotions}>
              {entry.emotions.map((emotion) => (
                <span key={emotion._id} className={css.emotionTag}>
                  {emotion.title}
                </span>
              ))}
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export default DiaryEntryCard;
