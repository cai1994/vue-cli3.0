// 获取components文件夹下的所有vue文件
const requireComponent = require.context(".", true, /main.vue$/);

// 将component下的每个组件全局注册
const install = function(Vue) {
  if (install.installed) return;
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    Vue.component(
      componentConfig.default.name,
      componentConfig.default || componentConfig
    );
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  install
};

export default API;
