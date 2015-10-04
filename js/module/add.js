/**
 * Created by lianxu-admin on 2015/10/4.
 */
console.log('add out run')

define(function(require,exports,module){
    console.log("add run" )

    var a = 1;
    function add (b){
        return a + b;
    }

    module.exports = add;
})