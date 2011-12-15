var
  console = require('console'),
  http = require('http'),
  fs = require('fs')

console.log('Start!')

function sendMissing(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('404 Not Found')
  response.end()
}

function sendFile(path, response, contentType) {
  response.writeHead(200, {'Content-Type': contentType})

  var stream = fs.createReadStream(path)

  stream.on('data', function(chunk) {
    response.write(chunk)
  })

  stream.on('end', function() {
    response.end()
  })
}

http.createServer(function(request, response) {
  request.on('end', function() {
    var urlParts = request.url.split('/')

    if(urlParts[1] == 'assets') {
      var files = fs.readdirSync('./assets')

      if(files.indexOf(urlParts[2]) > -1) {
        sendFile('./assets/' + urlParts[2], response, 'application/octet-stream')
      } else {
        sendMissing(response)
      }
    } else {
      sendFile('./index.html', response, 'text/html')
    }
  })
}).listen(8080)

