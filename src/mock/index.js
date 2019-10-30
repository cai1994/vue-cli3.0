const Mock = require("mockjs");
const util = require("./util");

/**
 * @date 2018/09/05
 * @methods methods表示请求方法,默认是GET;
 * @handle 表示请求接口；
 * @dbPath 表示mock数据名称;
 * @author xy
 */
let apiMap = [
  {
    handle: "selectLoginUserInfo",
    dbPath: "userInfo"
  },
  {
    handle: "getLoginMessage"
  },
  {
    handle: "logout"
  },
  {
    handle: "getAllMenu"
  }
];
//返回一个函数
module.exports = function(app) {
  //监听http请求
  apiMap.forEach(item => {
    let { methods = "POST", handle, dbPath = handle } = item;
    let json = util.getJsonFile(`./db/${dbPath}.json`);
    app[methods.toLowerCase()](
      `${process.env.VUE_APP_USE_API}${handle}`,
      (req, res) => {
        res.json(Mock.mock(json));
      }
    );
  });
};
