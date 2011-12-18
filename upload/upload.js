$(document).ready(function() {
  $('form.file').submit(function(event) {
    var
      key  = Math.floor(Math.random() * 100000000),
      form = $(this).attr('action', '/' + key),
      updateStatus = function() {
        var random = Math.floor(Math.random() * 100000000)
        $.ajax({
          url: '/status/' + key + '?ie_random=' + random,
          success: function(progress) {
            var parsedProgress = Math.ceil(parseFloat(progress) * 100)
            $('#upload_progress').text(parsedProgress + '%')
            if(parsedProgress < 100) setTimeout(updateStatus, 1000)
          },
          error: function() {
            setTimeout(updateStatus, 1000)
          }
        })
        form.hide()
      }

    setTimeout(updateStatus, 1000)

    $(this).ajaxSubmit({
      success: function(filename) {
        filename = filename.replace('<PRE>', '').replace('</PRE>', '')
        var filepath = 'http://' + location.host + '/upload/' + filename
        $('#submit_button').removeAttr('disabled')
        $('#path').show()
        $('#file_link').attr('href', filepath).text(filepath)
        $('#path_field').val(filepath)
      }})
    event.preventDefault()
    return false
  })
})

