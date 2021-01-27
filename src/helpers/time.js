/**
 * Count days between 2 dates
 * @param {Date} date1 first date
 * @param {Date} date2 second date (date2> date1)
 */
export function countDaysBetween(date1, date2) {
  return Math.round((date2 - date1) / 1000 / 60 / 60 / 24);
}
