
/**
 * @description 节流 多长时间内必须执行一次
 * @author xiaoyang
 * @date 2019-04-18
 * @export
 * @param {Func} fn 需执行的函数
 * @param {number} [wait=1000] 指定时间内只执行一次
 * @returns
 */
export function throttle(fn, wait = 1000) {
  let preview = 0;
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    let context = this;
    let args = arguments;
    
    let now = Date.now();
    if (preview - now >= wait) {
      fn.apply(fn, args);
      preview = now;
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, wait);
      }, wait);
    }
  }
};