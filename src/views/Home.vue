<template>
  <div class="main">
    <cus-header>
      <h1 slot="title" class="fs18 abs-center">Hi！ 欢迎登录恒天财富综合业务平台</h1>
    </cus-header>
    <cus-breadcrumb></cus-breadcrumb>
    <div class="cus-body" ref="scrollBody">
      <cus-menu class="cus-body__menu rel"></cus-menu>
      <div class="cus-body__main">
        <div class="outer rel" ref="outer">
          <keep-alive :include="menuCache">
            <router-view></router-view>
          </keep-alive>
          <cus-cache></cus-cache>
          <el-tooltip class="pointer" effect="dark" content="回到顶部" placement="left" v-if="backToTopBool">
            <div class="back" @click="backToTop">
              <i class="el-icon-caret-top"></i>
            </div>  
          </el-tooltip>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "mixins/search";

export default {
  name: "Home",
  mixins: [search],
  provide: {
    icons: [
      {
        id: 0, imgUrl: require("images/icon_01.png")
      }
    ],
    tabs: [
      { id: 0, desc: "我是测试1", resUrl: "a" },
      { id: 1, desc: "我是测试2", resUrl: "b" },
      { id: 2, desc: "我是测试3", resUrl: "c" },
      { id: 3, desc: "我是测试4", resUrl: "d" },
      { id: 4, desc: "我是测试5", resUrl: "e" }
    ]
  },
  data() {
    return {
      menuCache: [],
      backToTopBool: false
    }
  },
  // 获取缓存组件对象数组
  created() {
    this.getCache();
  },
  mounted() {
    // 是否显示回到顶部按钮
    this.showBackToTopBtn();
    // 监听内容区tab切换事件
    this.$on('on-toggle-tab', url => {
      this.$router.push({ path: url });
    });
  },
  watch: {
    "$route"() {
      this.getCache();
    }
  },
  methods: {
    // 获取缓存数据
    getCache() {
      if(this.$storage.get("menuCache")) {
        this.menuCache = this.$storage.get("menuCache").map(n => {
          const { cache } = n.query;
          if(cache) return n.name;
        });
      }
    },
    showBackToTopBtn() {
      const wrapper = this.$refs.scrollBody.clientHeight;
      const inner = this.$refs.outer.clientHeight;
      console.log(wrapper, inner);
      inner > wrapper ? this.backToTopBool = true : this.backToTopBool = false;
    },
    // 回到顶部
    backToTop() {
      requestAnimationFrame(this.step);
    },
    step() {
      let dom = this.$refs.scrollBody;
      let domHeight = dom.scrollTop;
      if(domHeight > 50) {
        dom.scrollTop -= 50;
        requestAnimationFrame(this.step);
      } else if(domHeight < 51 && domHeight > 0) {
        dom.scrollTop -= 5;
        requestAnimationFrame(this.step);
      } else {
        return
      }
    }
  }
}
</script>
