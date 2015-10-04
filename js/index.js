require.config({
    baseUrl: "../../bower_components",
    paths: {
    }
});

console.log("index out run");
require(['../js/mode/count.min.js'], function(count) {
    console.log("index in run");
    count();
});
