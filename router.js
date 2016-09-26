function route(handle, pathname, response, request) {
	if(pathname !== '/favicon.ico') {
		console.log('Route a request for ' + pathname);
		if(typeof handle[pathname] === 'function') {
			handle[pathname](response, request);
		} else if(pathname.indexOf('.html') > -1) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write();
			response.end();
		} else {
			console.log('No request handler found for ' + pathname);
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write('404 Not found!');
			response.end();
		}
	}
}
exports.route = route;