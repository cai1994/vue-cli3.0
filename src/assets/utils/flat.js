/**
 * @description 将数据展平
 * @author xiaoyang
 * @date 2019-01-16
 * @param {Array} data
 * @returns 展平的数据
 */
function flat(data) {
  let temp = [];
  data.forEach(item => {
    const children = item.children;
    delete item.children;
    temp.push(item);
    if (children.length > 0) {
      temp = temp.concat(flat(children));
    }
  });
  return temp;
}

export default flat;
