var
  console = require('console'),
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  formidable = require('formidable'),
  static = require('./lib/static')
  port = 8080

http.createServer(function(request, response) {
  if(request.method == 'GET') {
    static.handleRequest(request, response, path.resolve('.'))
  } else {
    var form = new formidable.IncomingForm()
    form.uploadDir = './upload'
    var uploadedFile = null

    form.on('file', function(field, file) {
      uploadedFile = file
    })

    form.on('end', function() {
      response.writeHead(200, {'Content-Type': 'text/plain'})
      response.write(uploadedFile.path)
      response.end()
    })

    form.parse(request)
  }
}).listen(8080)

console.log('Listening on port ' + port)
