var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
	console.log("Request handler 'start' was called.");
	/*exec('dir', {encoding: "gbk"}, function(error, stdout, stderr) {
		console.log('stdout = ' + iconv.decode(stdout, 'gbk'));
		response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	  	response.write('<h1>' + iconv.decode(stdout, 'gbk')+ '</h1>');
	  	response.write('<b>但愿从今后，你我永不忘...</b>');  
	  	response.end('<p>Hello World</p>');
	});*/

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:"./tmp",  //文件上传地址
        keepExtensions:true  //保留后缀
    });

	console.log('about to parse');
	form.parse(request, function(error, fields, files) {
		console.log('parsing done');
		/*for(var p in files.imagefile) {
			console.log('files.imagefile p = ' + p);
		}*/
		console.log('files.imagefile.path = ' + files.imagefile.path);
		fs.renameSync(files.imagefile.path, './tmp/upload_' + parseInt(Math.random()*1000000) + '.png');
		/*response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('received image:<br/>');
		response.write('<img src="/show" />');
		response.end();*/
	})
}

function show(response) {
	console.log('Request handler "show" was called.');
	/*fs.readFile('./tmp/test.png', 'binary', function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
      		response.write(error + "\n");
      		response.end();
		} else {
	      	response.writeHead(200, {"Content-Type": "image/png"});
	      	response.write(file, "binary");
	      	response.end();
	    }
	})*/
	fs.readdir('./tmp',function(error, files) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
      		response.write(error + "\n");
      		response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
			for(var i = 0; i < files.length; i++) {
				console.log('files[i] = ' + files[i]);
				var byteNum = fs.statSync('./tmp/'+files[i]).size;
				var kbNum = (byteNum / 1024).toFixed(2);
				response.write('<h2>Picture SIZE = ' + (kbNum+'KB') + '</h2>');
				response.write('<img src="./tmp/'  + files[i] + '">');
			}
      		response.end();
	    }
	}, {encoding: 'utf8'})
}
 
exports.start = start;
exports.upload = upload;
exports.show = show;
