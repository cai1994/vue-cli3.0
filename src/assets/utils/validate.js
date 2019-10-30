/**
 * 验证规则
 */
const validator = {
  notEmptyBlur: { required: true, message: "不能为空", trigger: "blur" },
  notEmptyChange: { required: true, message: "不能为空", trigger: "change" },
  maxLength15: {
    max: 15,
    message: "请输入15位以内的字符",
    trigger: "blur"
  },
  maxLength20: {
    max: 20,
    message: "请输入20位以内的字符",
    trigger: "blur"
  },
  maxLength30: {
    required: true,
    max: 30,
    message: "请输入30位以内的字符",
    trigger: "blur"
  },
  maxLength50: {
    required: true,
    max: 50,
    message: "请输入50位以内的字符",
    trigger: "blur"
  },
  maxLength100: {
    max: 100,
    message: "请输入100位以内的字符",
    trigger: "blur"
  },
  maxLength200: {
    required: true,
    max: 200,
    message: "请输入200位以内的字符",
    trigger: "blur"
  },
  isFloat18: {
    pattern: /^\d{0,16}(\.\d{0,2})?$/,
    message: "请输入正确的金额值（小数位最多保留2位）",
    trigger: "blur"
  },
  isNumber: {
    pattern: /^\d+$/,
    message: "请输入数字",
    trigger: "blur"
  },
  phone: {
    pattern: /^1[3|4|5|7|8][0-9]{9}$/,
    message: "请输入正确的手机号码",
    trigger: "blur"
  }
};

export default validator;
