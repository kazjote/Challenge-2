exports.fetchBody = function(response, callback) {
  var data = ''
  response.setEncoding('utf8')
  response.on('data', function(chunk) {
    data += chunk.toString()
  })

  response.on('end', function() {
    callback(data)
  })
}

