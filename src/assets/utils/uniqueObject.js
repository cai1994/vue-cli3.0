/**
 * @description 对象数组去重
 * @author xiaoyang
 * @date 2019-03-21
 * @export
 * @param {*} arr
 * @param {*} uniqueProp 对象数组中的唯一元素
 * @returns
 */
export default function uniqueObj(arr, uniqueProp) {
  let result = {};
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    result[arr[i][uniqueProp]] = arr[i];
  }

  for (let item in result) {
    temp.push(result[item]);
  }

  return temp;
}
