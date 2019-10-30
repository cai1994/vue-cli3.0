<template>
  <ul class="tree-ul no-select">
    <li class="tree-li pointer" @click.stop="handleExpand(data)">
      <div
        class="tree-li__cont"
        :class="{
          'active-tree': data.resLevel === 3 && activeTreeId == data.id,
          'tree-li__cont--border': data.resLevel > 1
        }"
        @click="handleRoute(data)"
      >
        <div class="icon-cont" :class="{pl10: data.resLevel > 1}">
          <img :src="data.icon" alt="图标" v-if="data.resLevel === 1 && data.icon">
          <span
            :class="{
              'bold': data.children && data.children.length,
              'font-black': data.children && data.children.length,
              'fs16': data.resLevel === 1,
              'fs14': data.children && data.children.length,
              'fs12': data.children && !data.children.length
            }"
            class="pointer">
            {{ data.resName }}
          </span>
        </div>
          <img v-if="data.children && data.children.length && data.resLevel === 1 && !data.flag" :src="require('images/arrow-down.png')" />
          <img v-if="data.children && data.children.length && data.resLevel === 1 && data.flag" :src="require('images/arrow-up.png')" />
          <span v-if="data.children && data.children.length && data.flag &&  data.resLevel === 2" class="sec-menu fs14">-</span>
          <span v-if="data.children && data.children.length && !data.flag &&  data.resLevel === 2" class="sec-menu fs14">+</span>
      </div>
      <transition name="expand">
        <div v-show="data.flag">
          <tree-node
            v-for="(item, idx) in data.children"
            :key="idx"
            :data="item">
          </tree-node>
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>

import { findComponentUpward, findComponentsDownward } from "utils/assist";

export default {
  name: "TreeNode",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data () {
    return {
      topTree: findComponentUpward(this, 'CusMenu'),
      activeTreeId: null
    }
  },
  created() {
    // 刷新获取高亮元素
    this.activeTreeId = this.$route.query.highlight;
  },
  watch: {
    "$route"() {
      // 刷新获取高亮元素
      this.activeTreeId = this.$route.query.highlight;
    }
  },
  methods: {
    // 处理展开
    handleExpand() {
      this.$set(this.data, 'flag', !this.data.flag);
      if(this.topTree) {
        this.topTree.emitEvent(this.data);
      }
    },
    // 处理路由
    handleRoute(item) {
      // 通过最底层的节点，查找所有的子节点，并将子节点的对应activeTreeId置空
      if(this.topTree && item.resLevel === this.$storage.get("maxLevel")) {
        findComponentsDownward(this.topTree, "TreeNode").forEach(v => v.activeTreeId = null);
        this.activeTreeId = item.id;
      }

      // 该元素没有子元素，那当前元素可以路由
      if(item.children && !item.children.length) {
        this.$router.push({ path: item.resUrl, query: { highlight: item.id } });
      }
    }
  }
}
</script>

<style lang="scss">
.tree-li,
.tree-ul {
  padding-left: 7px;
}
.tree-li {
  &__cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 5px -20px;
    padding-left: 10px;
    color: $gray;
    .icon-cont {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
      }
    }
    span {
      padding: 7px;
    }
    &--border {
      border-top: 1px solid $lightGray;
    }
  }
}
.sec-menu {
  position: relative;
  margin-right: -6px;
  color: $blue;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid $blue;
    border-radius: 50%;
  }
}

.active-tree {
  position: relative;
  color: $white !important;
  background: $blue;
  padding-left: 20px;
  border-radius: 5px;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    right: -8px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid $blue;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.1s linear;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
