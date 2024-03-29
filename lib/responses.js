var fs = require('fs')

exports.sendMissing = function(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('404 Not Found')
  response.end()
}

exports.sendFile = function(path, response, contentType) {
  var stream = fs.createReadStream(path)

  response.writeHead(200,
    {'Content-Type': contentType,
     'Content-Length': fs.lstatSync(path).size})

  stream.on('data', function(chunk) {
    response.write(chunk)
  })

  stream.on('end', function() {
    response.end()
  })
}

exports.sendOk = function(response, content) {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write(content)
  response.end()
}

exports.sendError = function(response) {
  response.writeHead(422, {'Content-Type': 'text/plain'})
  response.write('422 Unprocessable Entity')
  response.end()
}

