/**
 * @description 获取路径的后缀
 * @author xiaoyang
 * @date 2019-04-10
 * @param {*} path
 * @returns
 */
function getSuffix(path) {
  if (!path) return;
  const arr = path.split(".");
  const lens = arr.length;
  const suffix = arr[lens - 1];
  return suffix;
}

const getSuffixMethod = {
  methods: {
    fileSuffix(name) {
      return `file-icon--${getSuffix(name)}`;
    }
  }
};

export default getSuffixMethod;
