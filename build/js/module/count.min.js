/**
 * Created by lianxu-admin on 2015/10/4.
 */
console.log("count out run");

//seajs 兼容写法，前置依赖，仍然不改变CMD实质，仍然是到内部requrie才执行define里的东西
//模块整个文件out的代码是加载后执行，只有define里的代码是到require才执行
// 依赖前置，与放里面一样，其实最后seajs会函数tostring再解析，帮我们添入依赖。
define(['../module/add.min'],function(require){
    console.log("count run") // 先执行
    var add = require('../module/add.min') // define模块后执行
    function count(){
        console.log(add(100))
    }
    return count;
})



/*define(function(require,exports,module){
     console.log("count run") // 先执行
     var add = require('../module/add.min') // 模块后执行
     function count(){
     console.log(add(100))
     }
     return count;
})*/
