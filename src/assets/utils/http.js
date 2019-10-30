import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "@/router";

let instance = axios.create({
  timeout: process.env.VUE_APP_USE_TIMEOUT,
  baseURL: `${process.env.VUE_APP_USE_API}/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code === "0000") {
      if (!res.datas) {
        return { self: 1 };
      } else {
        return res.datas;
      }
    } else if (res.code === "1000") {
      return;
    } else if (res.code === "4007" || res.status === "4007") {
      let redirectUrl = sessionStorage.getItem("url");
      window.location.href = redirectUrl;
    } else if (res.code == "4010") {
      router.push("/denied");
    }
    MessageBox.confirm(res.message, "提示", {
      showCancelButton: false,
      type: "error"
    });
    return;
  },
  error => {
    let msg = "加载失败";
    if (error.message.indexOf("timeout") !== -1) return;
    Message.error({ message: msg });
    return Promise.reject(error);
  }
);

export default instance;
