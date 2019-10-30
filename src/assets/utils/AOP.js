export default {
  // 前置型
  before: function(func) {
    let _this = this;
    let args = [].slice(arguments, 1);
    return function() {
      if (func.apply(_this, args) === false) {
        return false;
      }
      return _this.apply(this, arguments);
    };
  },
  // 后置型
  after: function(func) {
    let _this = this;
    let args = [].slice.call(arguments, 1);
    return function() {
      let ret = _this.apply(this, arguments);
      if (ret === false) {
        return false;
      }
      func.apply(this, args);
      return ret;
    };
  },
  // 环绕型
  around: function(beforeFunc, afterFunc) {
    let _this = this;
    let args = [].slice.call(arguments, 1);
    return function() {
      return _this
        .before(beforeFunc)
        .after(afterFunc)
        .apply(this, args);
    };
  },
  // 捕获异常
  throwing: function(throwingFunc) {
    let _this = this;
    let args = [].slice.call(arguments, 1);
    return function() {
      try {
        return _this.apply(this, arguments);
      } catch (e) {
        throwingFunc && throwingFunc.call(this, e, args);
      }
    };
  }
};
