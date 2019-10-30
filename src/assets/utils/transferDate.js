const dayjs = require("dayjs");

/**
 *
 * @param {Date} date 日期
 */
export const formatYmdhs = function(date) {
  if (date) return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  return;
};

/**
 *
 * @param {date} date 日期
 */
export const formatYmd = function(date) {
  if (date) return dayjs(date).format("YYYY-MM-DD");
  return;
};
