var fs = require('fs');
var path = require('path');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function (argument) {
	var chunk = process.stdin.read();
	if(chunk != null){
		process.stdout.write('input: ' + chunk);
	}
});

process.stdin.on('end', function (argument) {
	process.stdout.write('end');
});

console.log("argv: ", process.argv);