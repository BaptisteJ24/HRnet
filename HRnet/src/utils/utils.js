const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDateToString = (date) => {
  // format date to YYYY-MM-DD
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? `0${month}` : month;
  const dayString = day < 10 ? `0${day}` : day;

  return `${year}-${monthString}-${dayString}`;
};

export { capitalizeFirstLetter, formatDateToString };
