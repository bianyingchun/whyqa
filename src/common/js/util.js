export function throttle (fn, wait) { //节流
  wait = wait || 200
  var timer = null;
  return function(){
      var context = this;
      var args = arguments;
      if(!timer){
          timer = setTimeout(function(){
              fn.apply(context,args);
              timer = null;
          },wait)
      }
  }
}

export function debounce(fn, delay) {//防抖
  // 记录上一次的延时器
  var timer = null;
  var delay = delay || 200;
  return function() {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function() {
        fn.apply(that,args)
    }, delay);
  }
}

// 在输入框输入时，要搜索某个字符串，基于性能考虑，肯定不能用户没输入一个字符就发送一次搜索请求
// 一种方法就是等待用户停止输入，比如过了500ms用户都没有再输入，那么就搜索此时的字符串，这就是防抖；
// 节流比防抖宽松一些，比如我们希望给用户一些搜索提示，所以在用户输入过程中，没过500ms就查询一次相关字符串，这就是节流。
