var querystring = require("querystring"),
    fs = require("fs"),
	formidable = require("formidable");
	
function start(res)
{
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; '+
	    'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" method="post" enctype="multipart/form-data">'+//至关重要
	    '<input type="file" name="upload">'+
	    '<input type="submit" value="Upload file" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}

function upload(response, request)
{
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	form.uploadDir = "../../resource/img";//至关重要
  	console.log("about to parse");
  	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
		console.log(files.upload.path);
	    fs.renameSync(files.upload.path, "../../resource/img/yjc.gif");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
  	}); 
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("../../resource/img/yjc.gif", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;