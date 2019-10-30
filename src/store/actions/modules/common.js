import $http from "utils/http";

export default {
  // 获取登录用户信息
  async getUserInfo() {
    return await $http.post("/selectLoginUserInfo");
  },
  // // 获取字典值
  async getDict() {
    return await $http.post("/queryAllList");
  },
  // // 登出
  async logout() {
    return await $http.post("/logout");
  },
  // // 获取首页地址信息
  async getUrl() {
    return await $http.post("/getLoginMessage");
  },
  // // 获取全部菜单列表
  async getAllMenu() {
    return await $http.post("/getAllMenu");
  },
  // // 获取全部菜单和按钮列表
  async getAllMenuAndButton() {
    return await $http.post("/getAllMenuAndButton");
  }
};
