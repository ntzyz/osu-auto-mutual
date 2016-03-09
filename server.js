var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mutual = require('./mutual');
var port = 2333;

// replace with your own user name and password.
mutual.login('nobody', 'no password');

http.createServer((request, response) => {
    if (request.url.indexOf('/request/') == 0) {
        var date = new Date();
        console.log('[' + date.toDateString() + '] Trying to add: ' + request.url.substr(9));
        response.writeHead(200);
        mutual.mutual(request.url.substr(9), response);
        return;
    }
    
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd() + '/www', uri);

    fs.exists(filename, (exists) => {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<br /><center><b>这台服务器没有找到这个文件，非常害怕</b><hr />404 Not found.</center>");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += 'index.html';

        fs.readFile(filename, (err, file) => {
            if(err) {                
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            if (filename.indexOf('png') > 0) {
                response.writeHead(200, {"Content-Type": "image/png"});
            }
            else {
                response.writeHead(200);
            }
            response.write(file);
            response.end();
        });
    });
}).listen(port);
