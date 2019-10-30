<template>
  <div class="box" :class="{'is-scroll': noScrollBool}">
    <ul class="cache" :style="{width: responseWidth + 'px'}">
      <li
        v-for="(item, idx) in menuCache"
        :key="item.path"
        :class="{active: activeTreeId == item.query.highlight}"
        @click.self="goto(item)"
        ref="item"
        class="pointer no-select">
          {{ item.pageName }}
          <i class="el-icon-circle-close" @click.self="clearCahce(item, idx)" v-if="idx > 0"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CusCache",
  data() {
    return {
      menuCache: [],
      activeTreeId: null,
      responseWidth: null,
      noScrollBool: false
    }
  },
  created() {
    this.getCache();
  },
  watch: {
    "$route"() {
      this.getCache();
    },
    "menuCache"(newVal, oldVal) {
      this.$nextTick(() => {
        this.getAllItemWidth();
      })
    }
  },
  methods: {
    // 获取缓存信息
    getCache() {
      // 刷新获取高亮元素
      this.activeTreeId = this.$route.query.highlight;
      if(this.$storage.get("menuCache")) {
        this.menuCache = this.$storage.get("menuCache");
      }
    },
    // 获取所有的item，并计算宽度，用于调整顶部tab的样式
    getAllItemWidth() {
      const items = this.$refs.item;
      let allItemWidth = 0;
      if(items) {
        for(let i = 0; i < items.length; i++) {
          allItemWidth += items[i].offsetWidth;
        }
        allItemWidth += (items.length - 1) * 25;
      }
      allItemWidth < (window.innerWidth - 280) ? this.noScrollBool = false : this.noScrollBool = true;
      this.responseWidth = allItemWidth;
    },
    // 路由跳转：这里会添加一个cache字段，标记来自于底部tab切换，用户缓存页面
    goto(item) {
      this.$router.push({ path: item.path,  query: {...item.query, cache: true} });
    },
    // 清除底部tab
    clearCahce(item, idx) {
      if(idx) {
        const temp = this.menuCache.filter(n => n.name !== item.name);
        this.menuCache = temp;
        this.$storage.set(temp, "menuCache");
        const { path, query } = temp.slice(temp.length - 1)[0];
        this.$router.push({ path, query: { ...query } });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  bottom: 0;
  left: 250px;
  z-index: 99999;
  width: calc(100vw - 280px);
  height: 32px;
}
.is-scroll {
  height: 50px;
  overflow-y: hidden;
  overflow-x: scroll;
}
.cache {
  display: inline-block;
  li {
    display: inline-block;
    padding: 6px 15px;
    color: $fontBlack;
    border: 1px solid $fontBlack;
    background: $white;
    border-radius: 5px;
    margin-bottom: 15px;
    &+li {
      margin-left: 20px;
    }
    i {
      margin-left: 10px;
      &:hover {
        color: $red;
      }
    }
  }
}
.active {
  color: $blue !important;
}
</style>

