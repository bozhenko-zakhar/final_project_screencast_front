"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CalendarPicker.module.css";

type CalendarPickerProps = {
  id?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
};

type CalendarDay = {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
};

type CalendarPosition = {
  top: number;
  left: number;
};

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const formatDateToInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDateToDisplay = (value?: string) => {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return "";

  return `${day}.${month}.${year}`;
};

const getDateFromValue = (value?: string) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

const isSameDate = (dateA: Date, dateB: Date) =>
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

export default function CalendarPicker({
  id,
  value,
  placeholder = "Оберіть дату",
  disabled = false,
  minDate,
  hasError = false,
  onChange,
}: CalendarPickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const today = new Date();
  const selectedDate = getDateFromValue(value);

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate ?? today);
  const [position, setPosition] = useState<CalendarPosition>({
    top: 0,
    left: 0,
  });

  const updateCalendarPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 6,
      left: rect.left,
    });
  };

  const openCalendar = () => {
    updateCalendarPosition();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleReposition = () => {
      updateCalendarPosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  while (days.length < 42) {
    const nextDay = days.length - startDay - daysInMonth + 1;

    days.push({
      day: nextDay,
      date: new Date(year, month + 1, nextDay),
      isCurrentMonth: false,
    });
  }

  const handleSelectDate = (date: Date) => {
    const formattedDate = formatDateToInput(date);

    if (minDate && formattedDate < minDate) return;

    onChange(formattedDate);
    setCurrentDate(date);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className={`${styles.inputButton} ${hasError ? styles.inputError : ""}`}
        disabled={disabled}
        onClick={openCalendar}
      >
        <span className={value ? styles.inputValue : styles.placeholder}>
          {formatDateToDisplay(value) || placeholder}
        </span>

        <span className={styles.inputIcon}>⌄</span>
      </button>

      {isOpen && (
        <div
          className={styles.calendar}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <div className={styles.header}>
            <div className={styles.title}>
              <span>{months[month]}</span>
              <span>{year}</span>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              >
                ←
              </button>

              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              >
                →
              </button>
            </div>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {days.map((item) => {
              const itemValue = formatDateToInput(item.date);
              const isSelected = selectedDate
                ? isSameDate(item.date, selectedDate)
                : false;
              const isDisabled = minDate ? itemValue < minDate : false;

              return (
                <button
                  key={item.date.toISOString()}
                  type="button"
                  className={`${styles.dayButton} ${
                    !item.isCurrentMonth ? styles.otherMonth : ""
                  } ${isSelected ? styles.selected : ""}`}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(item.date)}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}