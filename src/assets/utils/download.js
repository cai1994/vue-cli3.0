import { transferBlob2File, downloadHttpInstance } from "./streamHttp";

/**
 * @description 下载文件
 * @author xiaoyang
 * @date 2019-04-03
 * @export
 */
function download({
  url,
  params = {},
  name = "附件",
  method = "POST",
  promptMsg = "无数据下载",
  noDataSize = "75"
} = {}) {
  return downloadHttpInstance({
    method,
    url,
    params,
    responseType: "blob"
  }).then(res => {
    transferBlob2File(res, { name, promptMsg, noDataSize });
    return "success";
  });
}

export default download;
