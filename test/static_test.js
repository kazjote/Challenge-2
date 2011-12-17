var
  http = require('http'),
  assert = require('assert'),
  port = 8080

options = {host: 'localhost', port: 8080, path: '/upload/fixture', method: 'GET'}

function fetchBody(response, callback) {
  var data = ''
  response.setEncoding('utf8')
  response.on('data', function(chunk) {
    data += chunk.toString()
  })

  response.on('end', function() {
    callback(data)
  })
}

// 200 OK
var request = http.request(options, function(res) {
  assert.equal(res.statusCode, 200)
  fetchBody(res, function(data) {
    assert.equal(data, 'Yum!\n')
  })
})

request.end()

// 404 Not Found
options.path = '/upload/wrong'
request = http.request(options, function(res) {
  assert.equal(res.statusCode, 404)
})

request.end()

