var
  console = require('console'),
  http = require('http'),
  path = require('path'),
  static = require('./lib/static'),
  upload = require('./lib/upload'),
  port = 8080

http.createServer(function(request, response) {
  var rootPath = path.resolve('.')
  if(request.method == 'GET') {
    static.handleRequest(request, response, rootPath)
  } else {
    upload.handleRequest(request, response, rootPath)
  }
}).listen(8080)

console.log('Listening on port ' + port)
