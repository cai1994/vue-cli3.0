<!-- 设置按钮>自定义显示配置 -->
<template>
  <div class="cus-shuttle" v-if="toggle">
    <div class="cus-shuttle--body">
      <i
        class="el-icon-close cus-shuttle--close pointer abs fs26"
        @click="closeToggle"
      ></i>
      <h1 class="cus-shuttle--body__title fs16 text-center">
        {{ $attrs.title }}
      </h1>
      <div class="cus-shuttle--body__main">
        <!-- 可选 -->
        <div class="optional">
          <h2 class="optional-title fs14 text-center">可选</h2>
          <ul class="optional-lists">
            <li
              v-for="(item, index) in optionalChild"
              :key="index"
              class="optional-lists--item pointer"
              :class="{ 'selected-acitve': isSelectedVal === item.value }"
              :title="item.value"
              @click="slectedItem(item)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <!-- 可选end -->
        <!-- 箭头操作 -->
        <div class="arrow">
          <p class="fs14 arrow-btn pointer" @click="singleRight">&gt;</p>
          <p class="fs14 arrow-btn pointer mt10" @click="doubleRight">
            &gt;&gt;
          </p>
          <p class="fs14 arrow-btn pointer mt10" @click="singleLeft">&lt;</p>
          <p class="fs14 arrow-btn pointer mt10" @click="doubleLeft">
            &lt;&lt;
          </p>
        </div>
        <!-- 箭头操作end -->
        <!-- 已选 -->
        <div class="selected">
          <h2 class="selected-title fs14 text-center">已选</h2>
          <ul class="selected-lists">
            <li
              v-for="(item, index) in selectedChild"
              :key="index"
              :title="item.value"
              class="optional-lists--item pointer"
              :class="{ 'selected-acitve': isSelectedVal === item.value }"
              @click="slectedItem(item)"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
        <!-- 移动操作 -->
        <div class="move">
          <p class="fs12 move-btn mt10 pointer" @click="up">上移</p>
          <p class="fs12 move-btn mt10 pointer" @click="down">下移</p>
        </div>
        <!-- 移动操作end -->
      </div>
      <!-- 已选end -->
      <el-button
        type="primary"
        :loading="false"
        size="medium"
        class="mt20 center-btn"
        @click="save"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CusShuttle",
  inject: ["optional"],
  inheritAttrs: false,
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionalChild: this.optional,
      selectedChild: [],
      selectOptional: null,
      isSelectedVal: null
    };
  },
  mounted() {
    document.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.closeToggle();
      }
    });
  },
  methods: {
    // 选中单个
    slectedItem(item) {
      this.isSelectedVal = item.value;
      this.selectOptional = item;
    },
    // 单箭头向右
    singleRight() {
      // 先push到选中的数组中，再删掉当前数组中对应的
      this.optionalChild.forEach((n, k, arr) => {
        if (n.value === this.isSelectedVal) {
          let temp = arr.splice(k, 1);
          this.selectedChild = [...this.selectedChild, ...temp];
        }
      });
    },
    // 双箭头向右
    doubleRight() {
      this.selectedChild = [...this.selectedChild, ...this.optionalChild];
      this.optionalChild = [];
    },
    // 单箭头向左
    singleLeft() {
      // 先push到选中的数组中，再删掉当前数组中对应的
      this.selectedChild.forEach((n, k, arr) => {
        if (n.value === this.isSelectedVal) {
          let temp = arr.splice(k, 1);
          this.optionalChild = [...this.optionalChild, ...temp];
        }
      });
    },
    // 双箭头向右
    doubleLeft() {
      this.optionalChild = [...this.optionalChild, ...this.selectedChild];
      this.selectedChild = [];
    },
    // 上移
    up() {
      this.sortArr(this.isSelectedVal, 1);
    },
    // 下移
    down() {
      this.sortArr(this.isSelectedVal, 0);
    },
    // 保存
    save() {
      if (!this.selectedChild.length) {
        this.$msg.alert("请至少选择一条数据");
      } else {
        this.$emit("closeToggle", false);
        this.$emit("sorted", this.selectedChild);
      }
    },
    // 关闭弹窗
    closeToggle() {
      this.$emit("closeToggle", false);
    },
    // 实现上移和下移的数据排序算法
    sortArr(SelectedVal, dir) {
      let temp = this.selectedChild.slice();
      let that = this;
      temp.some((val, idx) => {
        if (val.value === SelectedVal) {
          if (dir === 1 && idx === 0) {
            this.$msg.alert("已在顶部");
            return false;
          } else if (dir === 0 && idx === that.selectedChild.length - 1) {
            this.$msg.alert("已在底部");
            return false;
          }
          let nextIdx = dir === 1 ? idx - 1 : idx + 1;
          that.selectedChild = this.markMoveEle(idx, nextIdx);
        }
      });
    },
    // 标记需要移动的元素
    markMoveEle(curIdx, nextIdx) {
      let temp = this.selectedChild;
      temp[curIdx] = temp.splice(nextIdx, 1, temp[curIdx])[0];
      return temp;
    }
  }
};
</script>
