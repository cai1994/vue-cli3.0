/**
 * @description 想上查找最近的指定组件
 * @author xiaoyang
 * @date 2019-04-08
 * @param {*} context 上下文
 * @param {*} componentName 组件名称
 * @returns 返回指定组件的所有属性
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

/**
 * @description 向下查找最近的指定组件
 * @author xiaoyang
 * @date 2019-04-08
 * @param {*} context 上下文
 * @param {*} componentName 组件名称
 * @returns 返回指定组件的所有属性
 */
function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

/**
 * @description 找到指定组件的所有兄弟组件
 * @author xiaoyang
 * @date 2019-04-09
 * @param {*} context
 * @param {*} componentName
 * @param {boolean} [exceptMe=true]
 * @returns
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

/**
 * @description 向上找到所有的指定组件
 * @author xiaoyang
 * @date 2019-04-09
 * @param {*} context
 * @param {*} componentName
 * @returns
 */
function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

/**
 * @description 向下找到所有指定组件
 * @author xiaoyang
 * @date 2019-04-09
 * @param {*} context
 * @param {*} componentName
 * @returns
 */
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
export {
  findComponentUpward,
  findComponentDownward,
  findBrothersComponents,
  findComponentsUpward,
  findComponentsDownward
};
