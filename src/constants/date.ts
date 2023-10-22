export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getDays(month: (typeof MONTHS)[number]) {
  switch (month) {
    case "January":
    case "March":
    case "May":
    case "July":
    case "August":
    case "October":
    case "December":
      return 31;
    case "April":
    case "June":
    case "September":
    case "November":
      return 30;
    case "February":
      const year = new Date().getFullYear();
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    default:
      return -1;
  }
}

export const TWELVE_HOUR_BREAKPOINT = 12;
export const HOURS_IN_DAY = 24;
