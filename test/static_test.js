var
  http = require('http'),
  assert = require('assert'),
  port = 8080

options = {host: 'localhost', port: 8080, path: '/assets/fixture', method: 'GET'}

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

var request = http.request(options, function(res) {
  assert.equal(res.statusCode, 200)
  fetchBody(res, function(data) {
    assert.equal(data, 'Yum!\n')
  })
})

request.end()

options.path = '/assets/wrong'
request = http.request(options, function(res) {
  assert.equal(res.statusCode, 404)
})

request.end()

