const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const formatDate = (date) => dateFormatter.format(Date.parse(date));

export default dateFormatter;
