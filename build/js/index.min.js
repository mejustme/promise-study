/*require.config({
    baseUrl: "../../bower_components",
    paths: {
        jquery: "jquery/dist/jquery",  //默认读取文件时自动末尾加.js
        when: "when/when"
    }
});
require(['jquery','when'], function($,when) {
 这样when中引入模块时相对于全局配置baseURL的，而不是相对于路径
*/

require.config({
    baseUrl: "../../bower_components",
    paths: {
        jquery: "jquery/dist/jquery"  //默认读取文件时自动末尾加.js
        //必须是jquery,因为dist文件中定义的是这个名称
    }
});
// 这样写的时候，子模块就可以相对于当前文件路径
//jquery/dist/jquery.js 末尾加入.js,那么会加载相对于当前文件位置
/*发现只有jquery需要在paths中定义一下路径才能成功引用。
如果在require函数中直接写路径会报错。
例如：
require([“js/jquery”], function ($) {
})

 原因是因为jq本身不是一个amd模块,它只是兼容amd的require引用方式(非加载)而已,
 它内部兼容引入的那块代码将自己定义成了”jquery”，也就是说，如果事先jq已经加载了，
 你其它模块要用它，只需要define(["jquery"], function ($){});就成，
 否则，除非你的Jq文件路径为./jquery.js；这时候require拉取时的路径和模块名称相互对应，就能正常使用
 不然是不会有正确的返回的(因为模块名称对不上)，因此，解决的方式要么事先加载好Jq,要么在paths里配置jquery

*/


require(['jquery','when/when'], function($,when) {
    // jQuery。否则引入的dist/jquery文件貌似不符合AMD规范,只是适配AMD,必须要paths方式引入，$为undefiend
    // 或者引入 模块化一个个src/jquery定义的JQuery文件,这样完全符合AMD规范
    console.log($)
    console.log(when)
    var arr = [1,2,3,4,5,6];
    var deferred = when.defer();
    function run(deferred){
        var start = 1, end = 100;
        setInterval(function(){
            start <= end ? deferred.notify(start++) : '';
            start > end ? deferred.resolve() : ""
        },Math.random()*1000);
        return deferred.promise;
    }
    var promise = run(deferred);
    arr.forEach(function(value) {
        promise = promise.then(done(value),function(value){
            //当不返回或者返回非promise对象，那么下个then就执行成功的。
        },underway(value));
        //then()函数返回一个新的'promise',具体状态与值由里面的回调函数返回值决定。
        //then绑定了该上个promise对象中三个情况的回调函数。
    });
    function done(i) {
        return function(value) {
            console.log("第" + i + "个任务完成!");
            var deferred = when.defer();
            return run(deferred);
            //当不返回，或者返回非promise对象，执行正确回调
            //当返回pormise对象，根据这个promise状态执行响应函数（成功/失败），当状态未定，则等待，直到确定才执行回调函数
        }
    }

    function underway(i) {
        return function(progress) {
            console.log(progress);
            $("#content" + i).text("进度: " + progress + "%");
            return 0;
            //仅进行中回调函数,会继续执行后面的进行时回调函数
        }
    }

});
