/**
 * 拷贝某个某个目录
 * author stevenliu
 */

//var fs = require('fs');
var fs = require('graceful-fs');
//fs.gracefulify(natFs);
var os = require('os');
var path = require('path');

var srcDir = 'P:\\var\\nodes\\workspace\\webpack-react\\webpack\\node_modules\\';
var desDir = 'P:\\var\\alisvn\\workspace\\huiyou\\trunk\\assets\\node_modules\\';
//var srcDir = path.resolve('.') + '/../node_modules/';
//var desDir = path.resolve('.') + '/';

fs.readdir(srcDir, function(err, files) {

    files = Array.prototype.slice.call(files);
//    parseTreeJson(files, srcDir, desDir);
    iterator1(files);
});

//递归实现 recursion
var parseTreeJson = function(treeNodes, srcDir, desDir) {
    if (!treeNodes || !treeNodes.length) return;

    treeNodes.forEach(function(file){

    	var stat = fs.statSync(srcDir + file);

    	if(stat.isDirectory()){
            fs.mkdirSync(desDir + file);
    		fs.readdir(srcDir + file, function(err, files){
			    files = Array.prototype.slice.call(files);
			    parseTreeJson(files, srcDir + file + '/', desDir + file + '/');
    		});

    	}else{
    		var input =  fs.createReadStream(srcDir + file);
    		var output = fs.createWriteStream(desDir + file);
    		input.on('data', function(data){
    			if(output.write(data) === false){
    				input.pause();
    			}
                recursion++;
    		});
    		output.on('drain', function(){
    			input.resume();
    		});
    	}
    });
};

//非递归广度优先实现
var iterator1 = function (treeNodes) {
    if (!treeNodes || !treeNodes.length) return;
    var list = {},
        keys = [],
        fileTotal = 0,
        endTotal = 0,
        closeTotal = 0,
        dataTotal = 0,
        pauseTotal = 0,
        resumeTotal = 0,
        outFinishTo = 0,
        outCloseTo = 0;

    //先将第一层节点放入栈
    treeNodes.forEach(function(node){
        list[srcDir + node + '/'] = desDir + node + '/';
        keys.push(srcDir + node + '/');
    });

    while(keys.length){

        !function(){
            var file  = keys.shift();
            var stat = fs.statSync(file);

            if(stat.isDirectory()){
                fs.mkdirSync(list[file]);
                var files = fs.readdirSync(file);
                files.forEach(function(path){
                    list[file + path + '/'] = list[file] + path + '/';
                    keys.push(file + path + '/');
                });
            }else{
                var input =  fs.createReadStream(file);
                var output = fs.createWriteStream(list[file]);
//                input.pipe(output);
                input.on('data', function(data){
                    if(output.write(data) === false){
                        input.pause();
                        pauseTotal++;
                    }
                    dataTotal++;
                });
                output.on('drain', function(){
                    input.resume();
                    resumeTotal++;
                });

                input.on('error', function(){
                    console.log('error');
                });

                input.on('end', function(){
                    endTotal++;
                    console.log('end' + endTotal + '>>close' + closeTotal+ '>>dataTota' + dataTotal + '>>pauseTota' + pauseTotal+ '>>resumeTota' + resumeTotal+ '>>outFinish'+outFinishTo + '>>outClose'+outCloseTo );
                });

                input.on('close', function(){
                    closeTotal++;
                    console.log('end' + endTotal + '>>close' + closeTotal+ '>>dataTota' + dataTotal + '>>pauseTota' + pauseTotal+ '>>resumeTota' + resumeTotal+ '>>outFinish'+outFinishTo + '>>outClose'+outCloseTo );
                });

                output.on('finish', function(){
                    outFinishTo++;
//                    console.log('end' + endTotal + '>>close' + closeTotal+ '>>dataTotal' + dataTotal + '>>pauseTotal' + pauseTotal+ '>>resumeTotal' + resumeTotal+ '>>outFinish'+outFinishTo + '>>outClose'+outCloseTo );
                });

                output.on('close', function(){
                    outCloseTo++;
//                    console.log('end' + endTotal + '>>close' + closeTotal+ '>>dataTotal' + dataTotal + '>>pauseTotal' + pauseTotal+ '>>resumeTotal' + resumeTotal+ '>>outFinish'+outFinishTo + '>>outClose'+outCloseTo );
                });
                fileTotal++;
            }
            delete list[file];
            console.log(keys.length);
        }();
    }

    console.log('total' + fileTotal);
};


