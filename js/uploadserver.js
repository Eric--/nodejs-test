var http = require('http');
var fs = require('fs');
var path = require('path');

var ws = fs.createWriteStream(path.resolve('bak2.reg'));

var server = http.createServer(function (req, res) {

	req.on('data',	function (data) {
		ws.write(data);
	});

	req.on('end', function (argument) {
		ws.end();
		res.statusCode = 200;
		res.end('ok');
	})
});

server.listen(18000);

console.log('server is runing... ');