/**
 * 使用文件流复制文件
 * author stevenliu
 */

var fs = require('fs');
var readLine = require('readline');
var path = require('path');
var os = require('os'),
	out = process.stdout;

var rs = fs.createReadStream(path.resolve('demo/option2017-1.json'));
var ws = fs.createWriteStream(path.resolve('demo/option2017-2.json'));

var stat  = fs.statSync(path.resolve('demo/option2017-1.json'));

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

rs.on('data', function(chunk) {

    passedLength += chunk.length;
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function() {
    ws.end();
});

ws.on('drain', function() {
    rs.resume();
});

ws.on('finish', function() {
    out.write('finish......');
});


setTimeout(function show() {

    var percent = Math.ceil((passedLength / totalSize) * 100);
    var size = Math.ceil(passedLength / 1000000);
    var diff = size - lastSize;
    lastSize = size;
    out.clearLine();
    out.cursorTo(0);
    out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log();
        console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
    }
}, 500);

