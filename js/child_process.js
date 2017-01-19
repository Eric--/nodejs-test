var exec = require('child_process').exec;

var child = exec('ls -l');

child.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

child.on('close', function (code) {
	console.log('close code: ' + code);
});