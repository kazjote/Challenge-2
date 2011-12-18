$(document).ready(function() {
  $('form.file').submit(function(event) {
    var
      key  = Math.floor(Math.random() * 100000000),
      form = $(this).attr('action', '/' + key),
      updateStatus = function() {
        $.ajax({
          url: '/status/' + key,
          success: function(progress) {
            var parsedProgress = Math.ceil(parseFloat(progress) * 100)
            $('#upload_progress').text(parsedProgress + '%')
            if(parsedProgress < 100) setTimeout(updateStatus, 1000)
          },
          failure: function() {
            setTimeout(updateStatus, 1000)
          }
        })
      }

    setTimeout(updateStatus, 1000)

    $(this).ajaxSubmit({
      success: function(filename) {
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

