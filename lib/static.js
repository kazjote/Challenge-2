var
  responses = require('./responses'),
  fs = require('fs'),
  path = require('path'),
  url = require('url')

exports.handleRequest = function(request, response, rootDirectory) {
  var
    pathname = url.parse(request.url).pathname,
    pathParts = pathname.split('/')

  request.on('end', function() {
    if(pathParts[1] == 'upload') {
      var filename = path.join(rootDirectory, pathParts[1], pathParts[2])

      if(path.existsSync(filename) && fs.statSync(filename).isFile()) {
        responses.sendFile(filename, response, 'application/octet-stream')
      } else {
        responses.sendMissing(response)
      }

    } else if(pathname == '/') {
      var indexPath = path.join(rootDirectory, 'index.html')
      responses.sendFile(indexPath, response, 'text/html')
    } else {
      responses.sendMissing(response)
    }
  })
}

