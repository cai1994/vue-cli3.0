<template>
  <!-- 头部导航 -->
  <div class="cus-header rel">
    <img class="cus-header__left" :src="require('images/logo.png')" @click="toIndex" />
    <slot name="title"></slot>
    <ul class="cus-header__right">
      <li class="fs14 ml20">{{ userInfo.name }}</li>
      <li class="fs14 ml20">工号{{ userInfo.code }}</li>
      <li class="fs14 ml20">{{ userInfo.deptName }}</li>
      <li class="fs14 ml20">{{ userInfo.postName }}</li>
      <li class="fs14 ml20">
        <a class="font-white" @click="loginOut">退出</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "cusHeader",
  data() {
    return {
      userInfo: {
        postName: "..",
        deptName: "..",
        code: "..",
        name: ".."
      }
    }
  },
  created() {
    // 获取登录用户信息
    if(!this.$storage.get("userInfo")) {
      this.getUserInfo().then(res => {
        if(!res) return;
        this.userInfo = res;
        this.$storage.set(res, "userInfo");
      });
    } else {
      this.userInfo = this.$storage.get("userInfo");
    }
    // 获取url。当url里包含null时，重新获取
    const url = this.$storage.get("url");
    if(!url || /null/.test(url)) {
      this.getUrl().then(res => {
        if(!res) return;
        this.$storage.set(res, "url");
      });
    }
  },
  methods: {
    ...mapActions([
      "getUserInfo",
      "getUrl"
    ]),
    // 返回首页
    toIndex() {
      const indexUrl = this.$storage.get("url") + "/index.html";
      window.location.href = indexUrl;
    },
    // 退出
    loginOut() {
      this.$msg.confirm({
        msg: "确定要退出吗？",
        showCancelButton: true
      }, cb => {
        if(cb === "cancel") return;
        this.$store.dispatch("logout").then(() => {
          window.location.href = this.$storage.get("url") + "/login.html";
          this.$storage.clear();
        });
      });
    }
  }
};
</script>

<style lang="scss">
// 顶部
.cus-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999999999;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: url(../../assets/images/header-bg.png);
  color: $white;
  &__left {
    width: 130px;
    height: 40px;
    cursor: pointer;
    align-self: center;
  }
  &__right {
    display: flex;
    justify-content: center;
    a {
      user-select: none;
      &::before {
        content: "";
        display: inline-block;
        padding-left: 2px;
        padding-bottom: 16px;
        background: $white;
        margin-right: 10px;
        vertical-align: sub;
      }
    }
  }
}
</style>
