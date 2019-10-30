import { downloadHttpInstance } from "streamHttp";

const importFile = {
  data() {
    return {
      uploladFileParams: Object.create(null)
    };
  },
  methods: {
    importFile({ file, url, data = {}, noDataSize = 75, method = "POST" }) {
      let fd = new FormData();
      fd.append("file", file.file);
      for (let k in this.uploladFileParams) {
        fd.append(fd[k], fd[k]);
      }
      this.$store.dispatch(url, fd).then(res => {
        if (!res) return;
        const { result, errorDetails, successDetails } = res;
        const resLens = result.length;
        const errLens = errorDetails.length;
        const sucLens = successDetails.length;
        const msg = `共上传${resLens}条，上传成功${sucLens}条，上传失败${errLens}条`;
        if (!errLens) return this.$msg.alert(msg);
        return downloadHttpInstance({
          method,
          url,
          params: data,
          responseType: "blob"
        }).then(res => {
          if (res.data.size > noDataSize) {
            const prefix = res.headers["content-disposition"].match(/\.\w+/);
            const blob = new Blob([res.data]);
            const fileName = `导入错误数据${prefix}`;
            if ("download" in document.createElement("a")) {
              const link = document.createElement("a");
              link.download = fileName;
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click();
              URL.revokeObjectURL(link.href);
              document.body.removeChild(link);
            } else {
              navigator.msSaveBlob(blob, fileName);
            }
          } else {
            this.$msg.confirm("无数据下载");
          }
        });
      });
    }
  }
};

export default importFile;
