var
  console = require('console'),
  http = require('http'),
  path = require('path'),
  static = require('./lib/static'),
  upload = require('./lib/upload'),
  progressData = {},
  port = 8080

http.createServer(function(request, response) {
  var rootPath = path.resolve('.')
  if(request.method == 'GET') {
    static.handleRequest(request, response, rootPath, progressData)
  } else {
    upload.handleRequest(request, response, rootPath, progressData)
  }
}).listen(8080)

console.log('Listening on port ' + port)

