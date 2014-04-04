var http = require("http");

http.createServer(function(req, ress){
	
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("hello world");
	res.end();
}).listen(8888);
