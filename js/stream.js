var fs = require('fs');
var readLine = require('readline');
var path = require('path');
var os = require('os'),
	out = process.stdout;

var rs = fs.createReadStream(path.resolve('bak.reg'));
var ws = fs.createWriteStream(path.resolve('bak2.reg'));

var stat  = fs.statSync(path.resolve('bak.reg'));

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

rs.on('data', function(chunk) {

    passedLength += chunk.length;
    if (ws.write(chunk) === false) {
        rs.pause();
    }
    if(command == false){
    	rs.pause();
    }
});

rs.on('end', function() {
    ws.end();
});

ws.on('drain', function() {
	if(command == true){
		rs.resume();
	}
});


setTimeout(function show() {
	return;
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


var in1 = process.stdin,
	out = process.stdout,
	command = false;

in1.setEncoding('utf8');

in1.on('readable', function () {
	var chunk = in1.read();
	if(chunk !== null && chunk.search('\r?\n') > -1){
		console.log('Please input command "once" or "all"? ');
		if(chunk.indexOf("once") > -1){
			rs.resume();
		}else if(chunk.indexOf("all") > -1){
			command = true;
			rs.resume();
		}

		out.write(chunk);
	}
});