<template>
  <div>
    <el-form class="format140" label-width="90px" :rules="formRules" ref="searchForm" :model="searchForm">
      <el-form-item label="a" class="ml20">
        <el-input class="inp140" v-model="searchForm.a"></el-input>
      </el-form-item>
      <el-form-item label="定时发">
        <el-input class="inp140" v-model="searchForm.b"></el-input>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: "ExchangeComfirmnDetail",
  data() {
    return {
      formRules: {},
      searchForm: {
        a: "",
        b: ""
      }
    }
  }
}
</script>
