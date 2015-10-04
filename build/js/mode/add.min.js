/**
 * Created by lianxu-admin on 2015/10/4.
 */
console.log('add out run');
var a = 10;
define(function() {
    console.log("add in run")
    function add(b) {
        return a + b;
    }
    return add;
})