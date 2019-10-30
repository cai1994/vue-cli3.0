const uploadMethods = {
  methods: {
    /**
     * @description 限制上传文件的大小
     * @author xiaoyang
     * @date 2018-09-30
     * @param {Object} file 文件对象
     * @param {Number} limit 文件上传大小，单位为M
     * @returns
     */
    limitSize(file, limit = 5) {
      // 的方式在组件上的accept字段处
      let size = null;

      if (typeof limit === "number") size = limit;
      size = Number(size);

      const isLt5M = file.size / (1024 * 1024) < size;

      if (!isLt5M) {
        this.$message.error(`上传文件超过${size}MB!`);
      }
      return isLt5M;
    },
    // 将上传的文件序列化
    uploadFile({ file, handler = "uploadFile", limit = 20 } = {}) {
      const uploadFile = file.file;
      let params = new FormData();
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      params.append("file", uploadFile);
      if (this.limitSize(uploadFile, limit)) {
        return this.$store.dispatch(handler, params, config).then(res => {
          if (!res) return;
          return res;
        });
      }
    },
    delFile(data) {
      this.fileList.forEach((n, idx) => {
        if (data.uid === n.uid) {
          this.fileList.splice(idx, 1);
        }
      });
    }
  }
};

export default uploadMethods;
