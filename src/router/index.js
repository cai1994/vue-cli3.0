import Vue from "vue";
import VueRouter from "vue-router";
import CommonRouters from "./common";
import RouterConfig from "./modules";

import storage from "utils/storage";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("views/Home"),
      meta: {
        breadcrumbName: "首页",
        keepAlive: false
      },
      redirect: { name: "Welcome" },
      children: [...CommonRouters, ...RouterConfig]
    }
  ]
});

// 储存需要缓存的路由
router.afterEach(to => {
  const {
    path,
    name,
    meta: { keepAlive, breadcrumbName: pageName },
    query
  } = to;
  let cache = [];
  if (storage.get("menuCache")) {
    cache = [...cache, ...storage.get("menuCache")];
  }
  if (!cache.some(n => n.path === path) && keepAlive) {
    cache.push({
      path,
      name,
      keepAlive,
      pageName,
      query
    });
    if (!cache.find(n => n.name === "Welcome")) {
      cache.unshift({
        path: "welcome",
        name: "Welcome",
        pageName: "欢迎页",
        keepAlive: true,
        query: {}
      });
    }
  } else {
    cache.forEach((val, key, arr) => {
      if (val.path === to.path) {
        arr.splice(key, 1, { ...val, query });
      }
    });
  }

  sessionStorage.setItem("menuCache", JSON.stringify(cache));
});

export default router;
