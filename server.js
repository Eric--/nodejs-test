var http = require("http");
var url = require("url");

function start(route, handle)
{
	function onRequest(req, res)
	{
		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("reque-st " + pathname + " received.");
		route(handle, pathname, res, req);
	};
	http.createServer(onRequest).listen(8888);
	console.log("server started");
}

exports.start = start;
