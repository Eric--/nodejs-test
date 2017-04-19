/**
 * Created by Administrator on 2017/3/7.
 */

var copydir = require('copy-dir');

var srcDir = 'P:\\var\\nodes\\workspace\\webpack-react\\webpack\\node_modules\\';
var desDir = 'P:\\var\\nodes\\workspace\\guangfa\\node_modules\\';

copydir(srcDir, desDir, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('ok');
    }
});

// var People = require('./es6.js');
// var people1 = new People('xiaolong');
// people1.sayHi();