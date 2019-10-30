import axios from "axios";
import { Message, MessageBox } from "element-ui";

let downloadHttpInstance = axios.create({
  timeout: process.env.VUE_APP_USE_TIMEOUT,
  baseURL: `${process.env.VUE_APP_USE_API}/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

downloadHttpInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

downloadHttpInstance.interceptors.response.use(
  response => {
    let res = response.data;
    if (res) return response;
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

/**
 * @description 将Blob文件流下载
 * @author xiaoyang
 * @date 2019-04-03
 * @param {*} res
 * @param {*} { noDataSize, promptMsg, name }
 */
function transferBlob2File(res, { noDataSize, promptMsg, name }) {
  if (res.data.size > noDataSize) {
    const prefix = res.headers["content-disposition"].match(/\.\w+/);
    const blob = new Blob([res.data]);
    const fileName = `${name}${prefix}`;
    if ("download" in document.createElement("a")) {
      const link = document.createElement("a");
      link.download = fileName;
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } else {
      navigator.msSaveBlob(blob, fileName);
    }
  } else {
    MessageBox.confirm(promptMsg, "提示", {
      showCancelButton: false,
      type: "warning"
    });
  }
}

export { downloadHttpInstance, transferBlob2File };
