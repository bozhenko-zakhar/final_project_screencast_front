"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import styles from "./CalendarPicker.module.css";

type CalendarPickerProps = {
  id?: string;
  value: string;
  minDate?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange: (date: string) => void;
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export default function CalendarPicker({
  id,
  value,
  minDate,
  placeholder = "Оберіть дату",
  disabled = false,
  error = false,
  onChange,
}: CalendarPickerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const initialDate = value ? new Date(value) : new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    initialDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialDate.getFullYear()
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedDate = value ? new Date(value) : null;

  const formattedValue = selectedDate
    ? selectedDate.toLocaleDateString("uk-UA")
    : "";

  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const firstWeekDay = (firstDay.getDay() + 6) % 7;

    const daysArray = [];

    for (let i = 0; i < firstWeekDay; i += 1) {
      daysArray.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      daysArray.push(
        new Date(currentYear, currentMonth, day)
      );
    }

    return daysArray;
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
      return;
    }

    setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
      return;
    }

    setCurrentMonth((prev) => prev + 1);
  };

  const handleSelectDate = (date: Date) => {
    const isoDate = date.toISOString().split("T")[0];

    onChange(isoDate);
    setIsOpen(false);
  };

  const isDateDisabled = (date: Date) => {
    if (!minDate) return false;

    return (
      date <
      new Date(new Date(minDate).setHours(0, 0, 0, 0))
    );
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        id={id}
        className={clsx(
          styles.inputButton,
          error && styles.inputError
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span
          className={clsx(
            formattedValue
              ? styles.inputValue
              : styles.placeholder
          )}
        >
          {formattedValue || placeholder}
        </span>

  <div className={styles.inputIcon}>
  <svg width="20" height="20">
    <use href="/sprite.svg#today" />
  </svg>
</div>
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span>
                {new Date(
                  currentYear,
                  currentMonth
                ).toLocaleString("uk-UA", {
                  month: "long",
                })}
              </span>

              <span>{currentYear}</span>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrevMonth}
              >
                ←
              </button>

              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNextMonth}
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
            {days.map((date, index) => {
              if (!date) {
                return (
                  <div key={index} className={styles.emptyDay} />
                );
              }

              const isoDate = date
                .toISOString()
                .split("T")[0];

              const isSelected = value === isoDate;
              const disabledDate = isDateDisabled(date);

              return (
                <button
                  key={isoDate}
                  type="button"
                  className={clsx(
                    styles.dayButton,
                    isSelected && styles.selected
                  )}
                  disabled={disabledDate}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}