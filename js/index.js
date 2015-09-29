var when = require('../bower_components/when/when.js');
var arr = [1,2,3,4,5,6];
var deferred = when.defer();
function run(deferred){
    var start = 1, end = 100;
    setInterval(function(){
        start <= end ? deferred.notify(start++) : '';
        start == end ? deferred.resolve() : ""
    },Math.random()*1000);
    return deferred.promise;
}
var promise = run(deferred);
arr.forEach(function(value) {
    promise = promise.then(done(value),null,underway(value));
    //then()函数返回一个新的'promise',具体状态与值由里面的回调函数返回值决定。
})

function done(i) {
    return function(value) {
        console.log("第" + i + "个任务完成!");
        var deferred = when.defer();
        return run(deferred);
        //当不返回，或者返回非promise对象，执行正确回调
        //当返回pormise对象，根据这个promise状态执行响应函数，当状态未定，则等待，直到确定才执行回调函数
    }
}

function underway(i) {
    return function(progress) {
        $("#content" + i).text("进度: " + progress + "%");
    }
}
