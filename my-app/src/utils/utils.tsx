export const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return formatter.format(date);
};
