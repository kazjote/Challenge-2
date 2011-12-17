var
  path = require('path'),
  formidable = require('formidable')

exports.handleRequest = function(request, response, rootPath) {
  var
    form = new formidable.IncomingForm(),
    uploadedFile = null

  form.uploadDir = path.join(rootPath, 'upload')

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
