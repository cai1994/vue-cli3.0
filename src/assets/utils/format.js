/**
 *
 * @param {Object} row 表格行数据
 * @param {Object} col 表格列数据
 * @param {Object} cellValue 表格单元格数据
 */
export function transferMoney2Fixed(row, col, cellValue) {
  if (!cellValue) return "0.00";
  typeof cellValue === "number"
    ? cellValue.toFixed(2)
    : Number(cellValue).toFixed(2);
}

/**
 * @description 将空格转化为“--”
 * @param {Objecy} row
 * @param {Object} col
 * @param {*} cellValue 单元格的值
 */
export function transferNull(row, col, cellValue) {
  if (cellValue == undefined) return "--";
  return cellValue;
}
