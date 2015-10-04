seajs.use(['../../bower_components/jquery/dist/jquery','../../bower_components/when/when'], function($,when) {
    // jQuery。否则引入的dist/jquery文件貌似不符合AMD规范,只是适配AMD,必须要paths方式引入，$为undefiend
    // 或者引入 模块化一个个src/jquery定义的JQuery文件,这样完全符合AMD规范
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
