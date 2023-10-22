import { TWELVE_HOUR_BREAKPOINT } from "@/constants/date";

// range: more than 1903 and less than current year
export const isValidYear = (year: number) =>
  year > 1902 && year < new Date().getFullYear() + 1;

// some math here, just some
export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export function getRelativeTime(date: Date) {
  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const timeUnitSeconds = [
    60,
    3600,
    86400,
    604800,
    2592000,
    31536000,
    Infinity,
  ] as const;
  const timeUnits = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ] as const;

  const unitIndex = timeUnitSeconds.findIndex(
    (timeUnitSecond) => timeUnitSecond > Math.abs(deltaSeconds)
  );

  const divisor = unitIndex ? timeUnitSeconds[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "narrow",
  });

  try {
    return rtf.format(
      Math.floor(deltaSeconds / divisor!),
      timeUnits[unitIndex]!
    );
  } catch (error) {
    console.error(error);
    return "Error parsing date";
  }
}

export async function getJoinedDate(date: Date) {
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export async function getTweetCreatedDate(date: Date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const hour = date.getHours();
  const formattedHour = hour % TWELVE_HOUR_BREAKPOINT || TWELVE_HOUR_BREAKPOINT;
  const meridiem = hour < TWELVE_HOUR_BREAKPOINT ? "AM" : "PM";
  const minutes = date.getMinutes().toString();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${formattedHour}:${
    minutes.length > 1 ? minutes : `0${minutes}`
  } ${meridiem} · ${month} ${day}, ${year}`;
}
