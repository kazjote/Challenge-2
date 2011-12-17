var
  http = require('http'),
  assert = require('assert'),
  fs = require('fs'),
  port = 8080

var options = {
  host: 'localhost',
  port: 8080,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---------------------------17691267152601920827125765',
    'Content-Length': 232 } }

var request = http.request(options, function(res) {
  res.on('data', function(chunk) {
    var savedContent = fs.readFileSync(chunk.toString(), 'utf8')
    assert.equal(savedContent, 'Yum!\r\n')
  })

  res.on('end', function() {
    assert.equal(res.statusCode, 200)
  })
})

request.write(fs.readFileSync('./test/fixtures/form', 'utf8'))
request.end()

