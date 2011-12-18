var
  console = require('console'),
  http = require('http'),
  path = require('path'),
  static = require('./lib/static'),
  upload = require('./lib/upload'),
  progressData = {},
  port = 8080

if(process.env.UPLOAD_PORT) port = process.env.UPLOAD_PORT

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

http.createServer(function(request, response) {
  var rootPath = path.resolve('.')
  console.log(' -> Received request ' + request.method + ' ' + request.url)
  if(request.method == 'GET') {
    static.handleRequest(request, response, rootPath, progressData)
  } else {
    upload.handleRequest(request, response, rootPath, progressData)
  }
}).listen(port)

console.log('Listening on port ' + port)

