var
  path = require('path'),
  formidable = require('formidable'),
  url = require('url'),
  responses = require('./responses')

exports.handleRequest = function(request, response, rootPath, progressData) {
  var
    pathname = url.parse(request.url).pathname,
    form = new formidable.IncomingForm(),
    uploadedFile = null

  if(pathname == '/description') {
    form.parse(request, function(err, fields) {
      console.log('Processing description')
      responses.sendOk(response, fields.path + ': ' + fields.description)
    })
  } else {
    form.uploadDir = path.join(rootPath, 'upload')

    console.log('Processing file upload')
    form.on('progress', function(received, expected) {
      var key = pathname.replace('/', '')
      progressData[key] = received / expected
    })

    form.on('file', function(field, file) {
      uploadedFile = file
    })

    form.on('end', function() {
      responses.sendOk(response, path.basename(uploadedFile.path))
    })
    form.parse(request)
  }
}

