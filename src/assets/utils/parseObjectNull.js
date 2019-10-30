/**
 * @description 将对象中为undefined、null转化为“--”
 * @author xiaoyang
 * @date 2019-04-03
 * @param {*} obj
 * @returns
 */
function parseObjectNull(obj) {
  for (let k in obj) {
    if (obj[k] == undefined) {
      obj[k] = "--";
    }
  }
  return obj;
}

export default parseObjectNull;
