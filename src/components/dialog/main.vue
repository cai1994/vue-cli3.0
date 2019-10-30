<template>
  <el-dialog class="mt40" :title="title" :visible="dialogTableVisible" @open="getData" @close="toggleDialog">
    <el-form class="format65" label-width="65px" label-position="left" :rules="formRules" ref="searchForm" :model="searchForm">
      <el-form-item label="a" class="ml20">
        <el-input class="inp140"></el-input>
      </el-form-item>
      <el-form-item label="定时发" class="ml20">
        <el-input class="inp140"></el-input>
      </el-form-item>
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
    </el-form>
    <div class="cus-table">
      <el-table :data="tableData" border>
        <el-table-column property="date" label="日期"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div class="dialog-foot">
        <div class="btn-group">
          <el-button type="primary" @click="confirm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
        <!-- 分页 -->
        <el-pagination
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
      </div>
  </el-dialog>
</template>

<script>
import search from "mixins/search";

export default {
  name: "CusDialog",
  mixins: [search],
  props: {
    title: {
      type: String,
      default: "模态框名称"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: "",
      dialogTableVisible: this.show,
      tableData: [],
      searchForm: {},
      formRules: {}
    }
  },
  watch: {
    show() {
      this.dialogTableVisible = this.show;
    }
  },
  methods: {
    // 获取数据
    getData() {
      this.tableData = [];
      this.tableData = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    },
    toggleDialog() {
      this.$emit("update:show", false);
    },
    cancel() {
      this.toggleDialog();
    },
    confirm() {
      this.$emit("emitSelectHandler", this.selectionTableData);
      this.toggleDialog();
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>

