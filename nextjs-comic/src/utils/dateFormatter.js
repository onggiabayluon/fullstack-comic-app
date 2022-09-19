// Math.round : Làm tròn thành số nguyên 6.5 = 6
// Math.abs : Trị tuyệt đối |-2| = 2
// src: https://blog.webdevsimplified.com/2020-07/relative-time-format/

export let formatter;
const LANGUAGE = "en";
const isSupported = !(
  Intl === void 0 || typeof Intl.RelativeTimeFormat !== "function"
);

formatter = isSupported
  ? // Browser  compatible
    (formatter = new Intl.RelativeTimeFormat(LANGUAGE, {
      numeric: "auto",
    }))
  : // Browser not compatible
    (formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }));

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

const dateDiffInSecond = (date, today) => (Date.parse(date) - today) / 1000;

export function formatTimeAgo(date) {
  if (!isSupported) return formatter.format(new Date(date.replace(/-/g, "/")));

  let duration = dateDiffInSecond(date, new Date());

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
