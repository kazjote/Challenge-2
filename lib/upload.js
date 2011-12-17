var
  path = require('path'),
  formidable = require('formidable'),
  url = require('url'),
  responses = require('./responses')

exports.handleRequest = function(request, response, rootPath, progressData) {
  var
    form = new formidable.IncomingForm(),
    uploadedFile = null

  form.uploadDir = path.join(rootPath, 'upload')

  form.on('progress', function(received, expected) {
    var key = url.parse(request.url).pathname.replace('/', '')
    progressData[key] = {ratio: received / expected}
  })

  form.on('file', function(field, file) {
    uploadedFile = file
  })

  form.on('end', function() {
    responses.sendOk(response, uploadedFile.path)
  })

  form.parse(request)
}
