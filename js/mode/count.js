/**
 * Created by lianxu-admin on 2015/10/4.
 */
console.log("count out run");
var b = 100;
define(['./add'], function(add) {
   console.log("count in run");
   return function(){
      return add(b)
   }
})