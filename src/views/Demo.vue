<template>
  <div class="main">
    <cus-tab></cus-tab>
    <div class="main-body">
      <cus-title type="border">
        <h2>我测试我测试</h2>
      </cus-title>
      <el-form class="format140" label-width="90px" :rules="formRules" ref="searchForm" :model="searchForm">
        <el-form-item label="a" class="ml20">
          <el-input class="inp140"></el-input>
        </el-form-item>
        <el-form-item label="定时发">
          <el-input class="inp140"></el-input>
        </el-form-item>
        <el-button class="mb20 ml20 expand-btn fs12" @click="toggleExpand">
          {{isExpandBtn ? "收起" : "展开"}}筛选
          <i class="el-icon-arrow-down"></i>
        </el-button>
        <!--搜索和重置按钮-->
        <el-button
          :loading="searchStatus"
          type="primary"
          round
          class="ml20 mb20"
          @click="search(url, searchForm)"
        >搜索
        </el-button>
        <a
          class="ml10 mb20 no-select reset-btn"
          @click="resetForm">
          重置
        </a>
        <div class="expand-wrapper" ref="expandWrapper">
          <div class="expand-wrapper__item">
            <el-form-item label="气温">
              <el-input class="inp140"></el-input>
            </el-form-item>
            <el-form-item label="我">
              <el-input class="inp140"></el-input>
            </el-form-item>
            <el-form-item label="c">
              <el-input class="inp140"></el-input>
            </el-form-item>
          </div>
          <div class="expand-wrapper__item">
            <el-form-item label="c">
              <el-input class="inp140"></el-input>
            </el-form-item>
            <el-form-item label="c">
              <el-input class="inp140"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <cus-upload></cus-upload>
      <cus-shuttle
        title="自定义显示配置"
        @sorted="sort"
        :toggle.sync="toggleShuttle"
        @closeToggle="closeToggle">
      </cus-shuttle>
      <el-button @click="show = true" class="mt20 ml20">打开嵌套表格的 Dialog</el-button>
      <cus-dialog title="测试模态框标题" :show.sync="show"></cus-dialog>
      <div class="cus-table mt20">
        <el-table :data="tableData" border>
          <el-table-column property="date" label="日期"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="mt10 pb20 text-right"
          :page-size.sync="page.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="currentChange"
          @size-change="sizeChange"
          @prev-click="prevClick"
          @next-click="nextClick"
          :current-page.sync="page.pageNum"
          :total="page.totalSize">
        </el-pagination>
        <!-- 分页 end -->
        </div>
      <keep-alive :include="menuCache">
        <router-view></router-view>
      </keep-alive>
    <cus-cache></cus-cache>
    </div>
  </div>
</template>

<script>
import search from "mixins/search";

export default {
  name: "Demo",
  provide: {
    tabs: [
      { id: 0, desc: "我是测试1", resUrl: "a" },
      { id: 1, desc: "我是测试2", resUrl: "b" },
      { id: 2, desc: "我是测试3", resUrl: "c" },
      { id: 3, desc: "我是测试4", resUrl: "d" },
      { id: 4, desc: "我是测试5", resUrl: "e" }
    ],
    optional: [
      {
        label: "123", value: "123"
      }
    ]
  },
  mixins: [search],
  data() {
    return {
      url: "",
      searchForm: {},
      formRules: {},
      toggleShuttle: false, //穿梭框关闭打开状态
      show: false,
      tableData: [],
      menuCache: []
    }
  },
  // 获取缓存组件对象数组
  created() {
    if(this.$storage.get("menuCache")) {
      this.menuCache = this.$storage.get("menuCache");
    }
  },
  mounted() {
    this.$on('on-toggle-tab', url => {
      this.$router.push({ path: url });
    });
  },
  methods: {
    // 穿梭框排序
    sort(arr) {
      this.staffTable = arr;
    },
    // 关闭穿梭框
    closeToggle(val) {
      this.toggleShuttle = val;
    }
  }
}
</script>

<style lang="scss">
.main {
  &-body {
    min-height: calc(100vh - 235px);
    background: $white;
    margin-top: 10px;
  }
}
</style>

