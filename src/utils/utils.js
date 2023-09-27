/**
 * description: capitalize the first letter of a string.
 * @param {string} string - string to capitalize.
 * @returns {string} - the string with the first letter capitalized.
 * @example
 * capitalizeFirstLetter("hello"); // "Hello"
 */
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * description: format a date to YYYY-MM-DD.
 * @param {Date} date - date to format.
 * @returns {string} - the date formatted to YYYY-MM-DD.
 * @example
 * formatDateToString(new Date()); // "2023-09-27"
 */
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
