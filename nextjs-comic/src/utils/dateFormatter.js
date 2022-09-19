// Math.round : Làm tròn thành số nguyên 6.5 = 6
// Math.abs : Trị tuyệt đối |-2| = 2
// src: https://blog.webdevsimplified.com/2020-07/relative-time-format/

const LANGUAGE = "en";

const formatter = new Intl.RelativeTimeFormat(LANGUAGE, {
  numeric: "auto",
});

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
  let duration = dateDiffInSecond(date, new Date());

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
