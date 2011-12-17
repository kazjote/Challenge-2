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
  res.on('error', function(error) {
    console.log(error)
  })

  res.on('data', function(chunk) {
    console.log('data received')
    var savedContent = fs.readFileSync(chunk)
    assert.equal(savedContent, 'Yum!')
  })

  res.on('end', function() {
    console.log('response ended!')
    assert.equal(res.statusCode, 200)
  })
})

request.on('error', function(error) {
  console.log('error: ' + error.message)
})

request.write(fs.readFileSync('./test/fixtures/form'))
request.end()

