/**
 * @description 防抖 多长时间内才能执行一次
 * @author xiaoyang
 * @date 2019-04-18
 * @export
 * @param {Func} fn 需要执行的函数
 * @param {number} [wait=2000] 执行间隔
 * @param {boolean} [immediate=false] 是否立即执行
 * @returns
 */
export function debounce(fn, wait = 1000, immediate = false) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) fn.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  }
};