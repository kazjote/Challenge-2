var
  http = require('http'),
  assert = require('assert'),
  helper = require('./helper'),
  port = 8080

options = {
  host: 'localhost',
  port: 8080,
  path: '/upload/fixture',
  method: 'GET' }

// 200 OK
var request = http.request(options, function(res) {
  assert.equal(res.statusCode, 200)
  helper.fetchBody(res, function(data) {
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

