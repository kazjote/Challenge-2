var
  console = require('console'),
  http = require('http'),
  fs = require('fs'),
  formidable = require('formidable')

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

function sendError(response) {
  response.writeHead(422, {'Content-Type': 'text/plain'})
  response.write('422 Unprocessable Entity')
  response.end()
}

http.createServer(function(request, response) {
  var urlParts = request.url.split('/')
  if(request.method == 'GET') {
    request.on('end', function() {

      if(urlParts[1] == 'upload') {
        var files = fs.readdirSync('./upload')

        if(files.indexOf(urlParts[2]) > -1) {
          sendFile('./upload/' + urlParts[2], response, 'application/octet-stream')
        } else {
          sendMissing(response)
        }
      } else {
        sendFile('./index.html', response, 'text/html')
      }
    })
  } else {
    console.log('POST request')
    var form = new formidable.IncomingForm()
    form.uploadDir = './upload'
    var uploadedFile = null

    form.on('error', function(error) {
      console.log('Error while parsing: ' + error)
    })

    form.on('field', function() {})

    form.on('file', function(field, file) {
      console.log('Received file!')
      uploadedFile = file
    })

    form.on('end', function() {
      console.log('End of form')
      response.writeHead(200, {'Content-Type': 'text/plain'})
      response.write(uploadedFile.path)
      response.end()
    })

    try {
      form.parse(request)
    } catch(error) {
      console.log('Error while parsing request: ' + error.message)
    }
  }
}).listen(8080)

