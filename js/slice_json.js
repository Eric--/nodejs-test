/**
  * 根据文本内容切割大的文件
  * author stevenliu
  */


// 引入readline模块
var readline = require('readline');
var fs = require('fs');  
var os = require('os');
var path = require('path');
var out = process.stdout;

// var fRead = process.stdin;
var fRead = fs.createReadStream(path.resolve('demo/option2018.json'));
var fWrite = fs.createWriteStream(path.resolve('demo/test1.json'));

fRead.setEncoding('utf8');

//创建readline接口实例
var  rl = readline.createInterface({
    input: fRead,
    terminal: true
});

var index = 1;
var fileName = 'option.json';
rl.on('line', function (line) {

	if(line.substr(line.length-1) == ","){
		line = line.substr(0, line.length - 1);
	}
    var start = line.indexOf('Time') + 7;
    if(fileName != "option" + line.substr(start, 10) + ".json"){
        if(line.indexOf(']') == -1){
			fWrite.write(']');
		}
		fWrite.end();
		fileName = "option" + line.substr(start, 10) + ".json";
        //创建新文件写入
		fWrite = fs.createWriteStream(path.resolve('demo/2018/' + fileName));
		if(index == 1){
			fWrite.write(line + os.EOL);
		}else {
			fWrite.write("[" + line + os.EOL);
		}
	}else {
		//继续写入
		fWrite.write("," + line + os.EOL);
	}
	// out.clearLine();
	// out.cursorTo(0);
	// out.write(index + "");
	index++;
});

// close事件监听
rl.on("close", function(){
   // 结束程序
   	console.log("file has: " + index + " 行");
});