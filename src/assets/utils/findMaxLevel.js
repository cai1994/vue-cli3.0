import flat from "utils/flat";

/**
 * @description 查找最大的层级
 * @author xiaoyang
 * @date 2019-04-08
 * @param {*} data
 * @returns
 */
function findMaxLevel(data) {
  const temp = Math.max(...flat(data).map(n => n.resLevel));
  return temp;
}

export default findMaxLevel;
