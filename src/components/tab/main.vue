<template>
  <ul class="cus-tab">
    <li
      v-for="(item, index) in tabs"
      :key="index"
      @click="toggleTab(item)"
      class="cus-tab__item pointer fs14"
      :class="{active: activeId== item.id}">
        {{ item.desc }}
    </li>
  </ul>
</template>

<script>

import Emitter from "mixins/emitter.js";

export default {
  name: "CusTab",
  inject: [ "tabs" ],
  mixins: [ Emitter ],
  data() {
    return {
      activeId: this.tabs[0].id
    }
  },
  methods: {
    toggleTab(item) {
      this.activeId = item.id;
      this.dispatch("Test", "on-toggle-tab", item.resUrl);
    }
  }
}
</script>

<style <style lang="scss" scoped>
%line {
  content: "";
  position: absolute;
  bottom: 0;
}
.cus-tab {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  background: $white;
  border-radius: 5px;
  box-sizing: border-box;
  user-select: none;
  &__item {
    position: relative;
    padding: 5px 0px;
    margin: 0 25px;
    text-align: center;
    transition: 0.2s all ease;
    &::before {
      @extend %line;
      left: 100%;
      width: 0;
      transition: all  .2s .1s ease;
      border-bottom: 2px solid $blue;
      transform: scaleX(0.7);
    }
    &:hover::before {
      left: 0;
      width: 100%;
    }
    &:hover ~ &::before {
      left: 0;
    }
  }
}

.active {
  color: $blue;
  &::before {
    @extend %line;
    width: 100%;
    left: 0;
    border-bottom: 2px solid $blue;
  }
}
</style>