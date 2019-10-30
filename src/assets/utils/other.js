/**
 * @description 连字符转驼峰
 * @author xiaoyang
 * @date 2019-03-12
 * @export
 * @param {*} str
 * @returns
 */
export function camelize(str) {
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
}

/**
 * @description 首字母大写
 * @author xiaoyang
 * @date 2019-03-12
 * @export
 * @param {*} str
 * @returns
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @description 驼峰转连字符
 * @author xiaoyang
 * @date 2019-03-12
 * @export
 * @param {*} str
 * @returns
 */
export function hyphenate(str) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, "-$1").toLowerCase();
}

/**
 * @description 类型判断封装
 * @author xiaoyang
 * @date 2019-04-03
 * @export
 * @param {*} obj
 * @returns
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  return map[toString.call(obj)];
}
