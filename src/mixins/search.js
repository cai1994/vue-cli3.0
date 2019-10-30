const search = {
  data() {
    return {
      asyncLoading: false, // 异步加载的loading
      searchStatus: false,
      compTableData: [],
      selectionTableData: [], //选中的数据
      watchMark: "",
      isExpandBtn: false,
      page: {
        pageSize: 10, // 分页 每页显示10条
        pageNum: 1, // 分页 第1页
        totalSize: 0 // 总页数
      }
    };
  },
  watch: {
    watchMark: {
      handler: "watchMarkHandler"
    },
    page: {
      handler: "cachePageInfoHandler",
      immediate: true
    }
  },
  mounted() {
    const expandWrapper = this.$refs.expandWrapper;
    if (expandWrapper) {
      this.isExpandBtn = true;
    } else {
      this.isExpandBtn = false;
    }
  },
  methods: {
    cachePageInfoHandler() {
      sessionStorage.setItem("cahcePageInfo", JSON.stringify(this.page));
    },
    watchMarkHandler() {
      // 标记一下是否是重置的。是就不要搜索数据了，并且删掉该属性，避免后面判断失误
      this.$nextTick(() => {
        const searchUrl = this.url;
        const params = {
          ...this.searchForm,
          ...this.page,
          watchMark: this.watchMark
        };
        this.search(searchUrl, params);
        this.cachePageInfoHandler();
      });
    },
    search(url, params, name = "searchForm") {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        let searchParams = {};
        // 判定是搜索触发，还是watch触发
        if (params && params.watchMark) {
          delete params.totalSize;
          searchParams = params;
        } else {
          this.searchStatus = true;
          searchParams = { ...params, pageSize: 10, pageNum: 1 };
          this.page = { pageSize: 10, pageNum: 1 };
        }
        this.searchHandler(url, searchParams);
      });
    },
    searchHandler(url, searchParams) {
      // 开启加载动画
      this.asyncLoading = true;
      this.$store
        .dispatch(url, searchParams)
        .then(res => {
          // 一般这里会存在一个异步请求。分页请求时，会打开；请求到数据再关掉。
          this.asyncLoading = false;
          this.searchStatus = false;
          if (res) {
            const { datas, totalSize } = res;
            // 从缓存获取page信息
            const cahcePageInfo = JSON.parse(
              sessionStorage.getItem("cahcePageInfo")
            );
            this.page = { ...cahcePageInfo, totalSize };
            // 格式化表格数据：主要是将空数据转化为“--”
            this.compTableData = this.parseNull(datas);
          } else {
            this.compTableData = [];
            this.page = { pageNum: 1, pageSize: 10 };
          }
        })
        .catch(e => {
          this.asyncLoading = false;
          this.searchStatus = false;
          console.log(e);
        });
    },
    // 重置
    /**
     * @description 重置请求框。并且这里还可以排除不需要重置的参数
     * @author xiaoyang
     * @date 2019-04-03
     * @param {*} params 需要排除的参数
     */
    resetForm(params) {
      // 重置查询参数
      const temp = params;
      this.$refs.searchForm.resetFields();
      Object.keys(params).length > 0
        ? (this.searchForm = { ...this.searchForm, ...temp })
        : null;
      this.page.pageNum = 1;
      this.page.pageSize = 10;
      // 触发watch
      this.triggerWatch();
      // 标记重置
      this.resetMark = "reset";
    },
    // 表格操作
    handleSelectionChange(row) {
      this.selectionTableData = row;
    },
    // 将表格数据中的falsey转为‘--’
    parseNull(data) {
      if (!Array.isArray(data)) throw new Error("这里要传个数组");

      data.forEach(n => {
        for (let k in n) {
          if (n[k] == undefined) {
            n[k] = "--";
          }
        }
      });
      return data;
    },
    // 搜索条件展开与收缩
    toggleExpand() {
      // 切换收起展开
      this.isExpandBtn = !this.isExpandBtn;
      const expandWrapper = this.$refs.expandWrapper;
      if (!expandWrapper.classList.contains("form-shrink")) {
        expandWrapper.classList.remove("form-expand");
        expandWrapper.classList.add("form-shrink");
      } else {
        expandWrapper.classList.add("form-expand");
        expandWrapper.classList.remove("form-shrink");
      }
    },
    // 表格排序
    sortChange(col) {
      if (!col.prop) return;
      const order = col.order.slice(0, 1) === "a" ? "Asc" : "Desc";
      const orderByStr = `${col.prop}${order}`;
      this.searchForm.orderByStr = orderByStr;
      // 触发watch
      this.triggerWatch();
    },
    triggerWatch() {
      // 触发watch
      const rand = Math.random();
      this.watchMark = rand;
    },
    /**
     * @description pageSize 改变时会触发
     * @author xiaoyang
     * @date 2018-09-14
     * @param {number} val 修改后的值
     */
    sizeChange(val) {
      this.page.pageSize = val;
      // 触发watch
      this.triggerWatch();
      this.cachePageInfoHandler();
    },
    /**
     * @description currentPage 改变时会触发
     * @author xiaoyang
     * @date 2018-09-14
     * @param {number} val 修改后的值
     */
    currentChange(val) {
      this.page.pageNum = val;
      // 触发watch
      this.triggerWatch();
      this.cachePageInfoHandler();
    },
    /**
     * @description 用户点击上一页按钮改变当前页后触发
     * @author xiaoyang
     * @date 2018-09-14
     * @param {*} val 修改后的值
     */
    prevClick(val) {
      this.page.pageNum = val;
      // 触发watch
      this.triggerWatch();
      this.cachePageInfoHandler();
    },
    /**
     * @description 用户点击下一页按钮改变当前页后触发;
     * @author xiaoyang
     * @date 2018-09-14
     * @param {*} val 修改后的值
     */
    nextClick(val) {
      this.page.pageNum = val;
      // 触发watch
      this.triggerWatch();
      this.cachePageInfoHandler();
    }
  }
};

export default search;
