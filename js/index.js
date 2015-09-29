var when = require('../bower_components/when/when.js');
var arr = [1,2,3,4,5,6];
var arrPromise = [];
function run(i){
    var deferred = when.defer();
    var start = 1, end = 100;
    var beginTime;
    (function(interval) {
        beginTime = new Date();
        setInterval(function(){
            if(start<end){
                deferred.notify(start++);

            }else{
                deferred.notify(start++);
                var obj = {
                    beginTime: beginTime,
                    endTime: new Date()
                };
                deferred.resolve(obj);//只能传递一个对象
            }
        },interval);
    })(i*30);
    return deferred.promise;
}
arr.forEach(function(value,i){
    var promise = run(value);
    promise.then(endTask(value),null,changeText(value));
    arrPromise.push(promise);
})

function changeText(value){
    return function(content){
        $('#content'+ value).text('进度:' + content + '%');
    }

}

function endTask(value){
    return function(obj){
        console.log("第"+ value+ "个任务完成了! 用时：" + (obj.endTime-obj.beginTime) + " ms");
    }
}

function endAllTask(arr){
    console.log(arr);
    alert("任务完成");
}

function notendAllTask(arr){
    console.log(arr);
    alert("有任务出错" + arr.toString());
}

when.some(arrPromise,3).then(endAllTask,notendAllTask);