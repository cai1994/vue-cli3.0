<template>
  <div class="cus-menu">
    <tree-node
      v-for="(item, idx) in cloneData"
      :key="idx"
      :data="item"
      :class="{mt10: idx > 0}"
      @onToggleExpand="emitEvent"
      class="cus-menu__block">
    </tree-node>
  </div>
</template>

<script>
import TreeNode from "./node";
import deepClone from "utils/deepClone";
import flat from "utils/flat";
import findMaxLevel from "utils/findMaxLevel";

import { mapActions } from "vuex";

export default {
  name: "CusMenu",
  components: { TreeNode },
  inject: [ "icons" ],
  data() {
    return {
      cloneData: {},
      menus: {}
    }
  },
  created() {
    if(!this.$storage.get("menus")) {
      this.getAllMenu().then(res => {
        if(!res) return;
        this.menus = res;
        // 混合图标到对应的菜单中，需要在rebuildData前面
        this.mixinIcon();
        // 深拷贝菜单数据
        this.rebuildData();
        // 找到最深的菜单层级，并储存
        const maxLevel = findMaxLevel(this.menus);
        this.$storage.set(maxLevel, "maxLevel");
        this.$storage.set(this.menus, "menus");
      });
    } else {
      this.menus = this.$storage.get("menus");
      // 混合图标到对应的菜单中，需要在rebuildData前面
      this.mixinIcon();
      // 深拷贝菜单数据
      this.rebuildData();
    }
  },
  methods: {
    ...mapActions([
      "getAllMenu"
    ]),
    // 去掉引用类型的连接
    rebuildData () {
      this.cloneData = deepClone(this.menus);
    },
    mixinIcon() {
      this.icons.forEach((v, k) => {
        this.menus[k].icon = v.imgUrl;
        this.menus.splice(k, 1, this.menus[k]);
      });
    },
    emitEvent(data) {
      const arr = this.loop(this.cloneData, data);
      this.$storage.set(arr, "menus");
    },
    // 递归找到对应的node，修改flag
    loop(menus, data) {
      let roots = deepClone(menus);
      let node = [];
      while(roots.length) {
        const root = roots.shift();
        if(root.id === data.id) {
          root.flag = data.flag;
        }
        if (root.children.length) {
          this.loop(root.children, data);
        }
        node.push(root);
      }
      return node;
    }
  },
  watch: {
    data () {
      this.rebuildData();
    }
  }
}
</script>

<style lang="scss">
.cus-menu {
  &__block {
    background: $white;
    border-radius: 5px;
    padding: 5px 0 2px 15px;
  }
}
</style>


