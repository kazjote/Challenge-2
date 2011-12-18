var
  http = require('http'),
  assert = require('assert'),
  fs = require('fs'),
  helper = require('./helper'),
  port = 8080

var options = {
  host: 'localhost',
  port: 8080,
  path: '/abcd',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---------------------------17691267152601920827125765',
    'Content-Length': 232 } }

var request = http.request(options, function(res) {
  res.on('data', function(chunk) {
    var savedContent = fs.readFileSync('./upload/' + chunk.toString(), 'utf8')
    assert.equal(savedContent, 'Yum!\r\n')
  })

  res.on('end', function() {
    assert.equal(res.statusCode, 200)
  })
})

var
  fileContent = fs.readFileSync('./test/fixtures/form')

request.write(fileContent.slice(0, 232 / 2))

setTimeout(function() {
  options.method = 'GET'
  options.path = '/status/abcd'
  options.headers = {}

  var statusRequest = http.request(options, function(statusRes) {
    assert.equal(statusRes.statusCode, 200)
    helper.fetchBody(statusRes, function(data) {
      assert.equal(data, '0.5')

      request.write(fileContent.slice(232 / 2, fileContent.length))
      request.end()
    })
  })
  statusRequest.end()
}, 100)

