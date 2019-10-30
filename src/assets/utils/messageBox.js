// 提示消息弹窗
import { MessageBox } from "element-ui";
const message = {
  alert: ({ msg = "无数据", title = "提示" } = {}, cb) => {
    MessageBox.alert(msg, title, {
      confirmButtonText: "确定",
      callback: action => {
        cb && cb(action);
      }
    });
  },
  confirm(
    {
      msg = "无数据",
      title = "提示",
      type = "warning",
      showCancelButton = false
    },
    cb
  ) {
    MessageBox.confirm(msg, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type,
      showCancelButton
    })
      .then(() => {
        cb && cb("confirm");
      })
      .catch(() => {
        cb && cb("cancel");
      });
  }
};

export default message;
