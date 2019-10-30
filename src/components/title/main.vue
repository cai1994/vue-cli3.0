<template>
  <div class="cus-title" :class="{'border-gray': type !== 'dot'}">
    <i class="cus-title__dot" v-if="type === 'dot'"></i>
    <i class="cus-title__back" v-else-if="type === 'back'" @click="goBack"></i>
    <i class="cus-title__border" v-else></i>
    <slot></slot>
    <slot name="sub"></slot>
    <slot name="btn"></slot>
  </div>
</template>

<script>
export default {
  name: "CusTitle",
  props: {
    type: {
      type: String,
      default: "border"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.cus-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  margin-left: 20px;
  &__border {
    &::before {
      content: "";
      display: inline-block;
      padding: 0 2px 18px;
      margin-right: 10px;
      background: $blue;
      vertical-align: text-bottom;
    }
  }
  &__back {
    width: 25px;
    height: 25px;
    background: url(../../assets/images/blrw.png) no-repeat center;
    margin-right: 10px;
    cursor: pointer;
  }
  &__dot {
    width: 6px;
    height: 6px;
    margin-right: 10px;
    border-radius: 100%;
    background: $blue;
    vertical-align: middle;
  }
}

.border-gray {
  margin: 0 20px 20px 20px;
  border-bottom: 1px solid $borderColor;
}
</style>

