var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

function start(route, handle) {
	function onRequest(request, response) {
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		var absolutePath = __dirname + url.parse(request.url).pathname;
		/*if (path.extname(pathname) == "") {
	        pathname += "/";
	    }
	    if (pathname.charAt(pathname.length - 1) == "/") {
	        pathname += "index.html";
	    }*/
	    fs.exists(absolutePath, function(exists) {
	        if (exists) {
	            switch (path.extname(absolutePath)) {
	                case ".html":
	                    response.writeHead(200, {
	                        "Content-Type": "text/html"
	                    });
	                    break;
	                case ".js":
	                    response.writeHead(200, {
	                        "Content-Type": "text/javascript"
	                    });
	                    break;
	                case ".css":
	                    response.writeHead(200, {
	                        "Content-Type": "text/css"
	                    });
	                    break;
	                case ".gif":
	                    response.writeHead(200, {
	                        "Content-Type": "image/gif"
	                    });
	                    break;
	                case ".jpg":
	                    response.writeHead(200, {
	                        "Content-Type": "image/jpeg"
	                    });
	                    break;
	                case ".png":
	                    response.writeHead(200, {
	                        "Content-Type": "image/png"
	                    });
	                    break;
	                default:
	                    response.writeHead(200, {
	                        "Content-Type": "application/octet-stream"
	                    });
	            }
	            if(path.extname(absolutePath) !== "") {
	            	fs.readFile(absolutePath, function(err, data) {
		                response.end(data);
		            });
	            }
	        } else {
	            if(pathname !== '/favicon.ico') {
					console.log('Rrequest for ' + pathname + ' received!');
					route(handle, pathname, response, request);
				}
	        }
	    });
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server running at http://127.0.0.1:8888");
}

exports.start = start;
