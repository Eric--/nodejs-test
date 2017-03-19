/**
  * 删除注册表apple中的信息，便于卸载itunes和safari
  * author stevenliu
  */


// 引入readline模块
var readline = require('readline');
var fs = require('fs');  
var os = require('os');
var path = require('path');

// var fRead = process.stdin;
var fRead = fs.createReadStream(path.resolve('resource/bak.reg'));
var fWrite = fs.createWriteStream(path.resolve('resource/bak2.reg'));

fRead.setEncoding('utf8');

//创建readline接口实例
var  rl = readline.createInterface({
    input: fRead,
    terminal: true
});

var index = 1;
var list = [];
var listr = [];
var disable = false;
rl.on('line', function (line) {
	
	// fWrite.write(index+ ">>>" + line + os.EOL);
	list.push(line + os.EOL);
	console.log(index);
	index++;
});

// close事件监听
rl.on("close", function(){
   // 结束程序
   	console.log("file length: " + list.length);
   	for(var i = list.length - 1; i >= 0; i--){
   		listr.push(list.pop());
   	}
   	for(var i = 0; i < listr.length; i++){
   		var tmp = listr[i];
	   	if(disable){
			tmp = tmp.replace("HKEY_LOCAL_MACHINE", "-HKEY_LOCAL_MACHINE");	
			disable = false;
		}else if(tmp.toLowerCase().indexOf("safari".toLowerCase()) > -1){
			disable = true;
		}
		list.push(tmp);
   	}
   	for(var i = list.length - 1; i >= 0; i--){
   		fWrite.write(list[i]);
   	}
});