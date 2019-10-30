<template>
  <ul class="cus-breadcrumb no-select">
    <li v-for="(item, index) in menus" :key="index" class="cus-breadcrumb--item fs14 ml10">
      <span
        @click="goto(item.path, index)"
        :class="{
          'font-black': index === menus.length - 1,
          'font-gray': index !== menus.length - 1,
          pointer: index !== menus.length - 1
        }"
      >
        {{ item.name }}
      </span>
      <span v-if="index !== menus.length - 1"><i class="el-icon-arrow-right"></i></span>
      <span v-if="index === menus.length - 1"><i class="el-icon-arrow-down"></i></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CusBreadcrumb",
  data() {
    return {
      menus: [] // 路由集合
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.menus = [];
      this.$route.matched.forEach(item => {
        // 重要的是判断breadcrumbName是否数组。是数组，直接返回；反之，转化成数组
        let name = item.meta.breadcrumbName;
        const url = sessionStorage.getItem("url");
        let path = item.name === "Home" ? `${url}/index.html` : "/welcome";
        if (!Array.isArray(name)) {
          name = [name];
        }
        // 循环name，组装面包屑数组
        name.forEach(n => {
          this.menus.push({
            path,
            name: n
          });
        });
      });
    },
    goto(path, idx) {
      // 最后一层不让点击
      if(idx !== this.menus.length - 1) {
        if(/http(s)?.+/.test(path)) return window.location.href = path;
        this.$router.push({ path });
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style lang="scss">
// 面包屑
.cus-breadcrumb {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 9999999999;
  width: 100%;
  box-sizing: border-box;
  background: $white;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  color: $gray;
  &--item {
    display: inline-block;
    color: $gray;
  }
  .el-breadcrumb {
    height: 100%;
    line-height: 40px;
  }
  .is-active {
    .el-breadcrumb__inner {
      color: $black !important;
      font-weight: bold;
    }
  }
}
</style>
