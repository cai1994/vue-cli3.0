import Vue from "vue";

// 兼容低版本浏览器
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 全局引入自定义组件
import customizeComp from "~/index";
Vue.use(customizeComp);

// 引入axios实例
import instance from "@/assets/utils/http";
Vue.prototype.$http = instance;

// 绑定验证规则
import validateRules from "utils/validate";
Vue.prototype.$rules = validateRules;

// 绑定日期转化库
import dayjs from "dayjs";
Vue.prototype.$dayjs = dayjs;

// 序列化
import qs from "qs";
Vue.prototype.$qs = qs;

// 弹框提示
import messageBox from "utils/messageBox";
Vue.prototype.$msg = messageBox;

// sessionStorage封装
import storage from "utils/storage";
Vue.prototype.$storage = storage;

// 获取文件后缀
import getSuffixMethod from "mixins/getSuffix";
Vue.mixin({
  mixins: [getSuffixMethod]
});

// AOP
import { before, after, around, throwing } from "utils/AOP";
Function.prototype.before = before;
Function.prototype.after = after;
Function.prototype.around = around;
Function.prototype.throwing = throwing;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
