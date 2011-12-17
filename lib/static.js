var
  fs = require('fs'),
  path = require('path'),
  url = require('url'),
  responses = require('./responses')

exports.handleRequest = function(request, response, rootDirectory, progressData) {
  var
    pathname = url.parse(request.url).pathname,
    pathParts = pathname.split('/')

  console.log('Received GET request')

  request.on('end', function() {
    if(pathParts[1] == 'upload') {
      var filename = path.join(rootDirectory, pathParts[1], pathParts[2])

      if(path.existsSync(filename) && fs.statSync(filename).isFile()) {
        responses.sendFile(filename, response, 'application/octet-stream')
      } else {
        responses.sendMissing(response)
      }
    } else if(pathParts[1] == 'status') {
      var progress = progressData[pathParts[2]]
      if(progress) {
        responses.sendOk(response, progress.ratio.toString())
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

