const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  publicPath: "/",
  lintOnSave: process.env.NODE_ENV !== "production", // 编译时禁止使用"eslint-loader"
  productionSourceMap: false, // 关闭构建时生成sourceMap, 提高打包速度
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set("~", resolve("src/components"))
      .set("mixins", resolve("src/mixins"))
      .set("utils", resolve("src/assets/utils"))
      .set("http", resolve("src/assets/js"))
      .set("views", resolve("src/views"))
      .set("store", resolve("src/store"))
      .set("images", resolve("src/assets/images"))
      .set("styles", resolve("src/assets/styles"));
    // 修复HMR
    config.resolve.symlinks(true);
    if (IS_PROD) {
      config.optimization.minimize(true);
    }
    // 添加svg rule
    // const svgRule = config.module.rule("svg");
    // svgRule.uses.clear();
    // svgRule.exclude.add(/node_modules/);
    // svgRule
    //   .test(/\.svg$/)
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]"
    //   })
    //   .use("svgo-loader")
    //   .options({
    //     plugins: [{ removeAttrs: ["fill"] }]
    //   });
    // 修改images loader，添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    // 优化性能可以让以下库不打包，然后走cdn。但是怕cdn不稳定，引发不必要的问题，暂时没有启用
    // config.externals({
    //   vue: "vue",
    //   vuex: "vuex",
    //   "vue-router": "'vue-router'",
    //   "element-ui": "'element-ui'"
    // });
  },
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      // 去掉console/debugger
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "debugger"]
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      plugins.push(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  css: {
    loaderOptions: {
      // 全局引入scss变量文件
      sass: {
        data: `@import "@/assets/styles/_variable.scss";`
      }
    }
  },
  devServer: {
    // mock
    before: require("./src/mock"),
    // public: "dev.qasa.chtwm.com",
    host: "192.168.50.210",
    // 代理
    proxy: {
      "/dev": {
        target: process.env.VUE_APP_USE_IP,
        changeOrigin: true,
        pathRewrite: {
          "^/dev": ""
        }
      }
    }
  }
};
