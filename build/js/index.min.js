console.log("index out run")

define( function(require) {
  console.log("index run") // 先执行
  var count = require('../js/module/count.min') // 模块后执行
  count();
});

// 区别！！
// 模块先下载先执行，同 AMD require.js
/*
seajs.use('../js/module/count.min',function(count) {
  console.log(arguments) // 后执行
  count();
});
*/
