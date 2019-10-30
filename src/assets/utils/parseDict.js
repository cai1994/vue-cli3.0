/**
 * @description 通过value值找到label值
 * @author xiaoyang
 * @date 2018-11-08
 * @export
 * @param {*} val
 * @param {*} dict 字典数组
 */
function parseDict(val, dict) {
  let temp = null;
  if (Array.isArray(dict)) {
    dict.forEach(item => {
      if (val == item.codeValue) {
        temp = item.codeDesc;
      }
      if (val === "--") {
        temp = "--";
      }
    });
  }
  return temp;
}

export default parseDict;
