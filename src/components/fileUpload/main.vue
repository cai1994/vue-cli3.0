<template>
  <div class="cus-upload">
    <el-upload
      action=""
      :http-request="importData"
      :show-file-list="false"
      v-if="uploadParams.showUpload">
      <el-button type="primary" class="ml20 mt20 mr20 mb20" v-if="!uploadStatus">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="primary" class="ml20 mt20 mr20 mb20" v-else disabled>正在上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <slot name="sub"></slot>
    </el-upload>
    <ul class="list ml20">
      <li v-for="(file, idx) in fileList" :key="idx" class="list-item ml20">
        <i class="file-icon" :class="fileSuffix(file.filePath)"></i>
        <div class="fs13 mr30 list-item__cont">
          <span class="mr10">{{file.fileName}}</span>
          (<i class="font-blue">
            {{file.fileSize > Math.pow(10, 6) ? `${(file.fileSize / 1024 / 1024).toFixed(3)}Mb` : `${(file.fileSize / 1024).toFixed(3)}Kb`}}
          </i>)
        </div>
        <p v-if="uploadParams.showDownload" class="font-blue fs13 list-item__del pointer no-select" @click="downloadFile(file)">下载</p>
        <p v-if="uploadParams.showDel" class="font-red fs13 list-item__del pointer ml10 no-select" @click="delFile(file)">删除</p>
      </li>
    </ul>
  </div>
</template>

<script>
import upload from "mixins/upload";
import download from "utils/download";

export default {
  name: "CusUpload",
  mixins: [upload],
  props: {
    uploadParams: {
      type: Object,
      default() {
        return {
          showDownload: true,
          showUpload: true,
          showDel: true
        }
      }
    }
  },
  data() {
    return {
      uploadStatus: false,
      fileList: [
        {
          filePath: "123123123.txt",
          fileName: "asdasasdasdasdasdasdasdasdasasdasdasdasdasdasdasdasasdasdasdasdasdasdasdasasdasdasdasdasdasdasdasasdasdasdasdasdasd",
          fileSize: 1028
        }
      ]
    }
  },
  methods: {
    // 上传文件
    importData(file) {
      this.uploadStatus = true;
      this.uploadFile(file).then(res => {
        this.uploadStatus = false;
      });
    },
    // 下载文件
    downloadFile(file) {
      download();
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  &-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__cont {
      display: flex;
      justify-content: flex-start;
      span {
        display: inline-block;
        max-width: 400px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>

