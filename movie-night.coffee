$(document).ready ->
  WebFont.load
    google:
      families: ['Tangerine']
  $.ajaxSetup
    cache: true
  $.ajax 'http://api.themoviedb.org/3/movie/535/images?api_key=f9279dd427385129a3bf58fe314fa019',
    type: 'GET'
    dataType: 'json'
    error: (jqXHR, textStatus, errorThrown) ->
      $('#root').append "AJAX Error: #{textStatus}"
    success: (data, textStatus, jqXHR) ->
      $('#root').append \
        "Successful AJAX call:"
      new MoviePoster(back.file_path) for back in data.backdrops
      console.log data
  $.getScript 'http://connect.facebook.net/en_US/all.js', () ->
    FB.init
      appId: 532820393483542
      status: true
      cookie: true
      xfbml: false
      oauth: true
    FB.getLoginStatus myFacebookApp.doSomething

class DrawHelper
  @drawImage: (canvas, img) ->
    canvas.width = img.width
    canvas.height = img.height
    ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

  @getAverageRGB: (canvas) ->
    height = canvas.height
    width = canvas.width
    ctx = canvas.getContext('2d')
    data = ctx.getImageData 0, 0, width, height
    length = data.data.length
    while ( (i += blockSize * 4) < length )
      ++count;
      rgb.r += data.data[i]
      rgb.g += data.data[i+1]
      rgb.b += data.data[i+2]

    rgb.r = ~~(rgb.r/count)
    rgb.g = ~~(rgb.g/count)
    rgb.b = ~~(rgb.b/count)

    return rgb;
      
  @drawText: (canvas, title) ->
    ctx = canvas.getContext('2d')
    #console.log DrawHelper.getAverageRGB(canvas)
    text_color = "rgba(255, 255, 255, 0.8)"
    shadow_color = "rgba(0, 0, 0, 1.0)"
    top_font = "54pt Tangerine"
    bottom_font = "54pt Tangerine"
    ctx.fillStyle = text_color
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 3
    ctx.shadowColor = shadow_color
    ctx.font = top_font
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    text = "Cuesta Theater Presents"
    width = ctx.measureText(text).width
    ctx.fillText(text, (canvas.width-width)/2, 30)
    ctx.font = bottom_font
    width = ctx.measureText(title).width
    ctx.fillText(title, (canvas.width-width)/2, 200)

class MoviePoster
  constructor: (path) ->
    canvas = $(document.createElement 'canvas')
    $('#root').append canvas
    #canvas.click ->
      #alert "Selected #{path}"
    ctx = canvas[0].getContext('2d')

    # Create an image element
    img = $(document.createElement 'img')[0]

    # When the image is loaded, draw it
    img.onload = () ->
      DrawHelper.drawImage canvas[0], img
      DrawHelper.drawText canvas[0], "Flashdance"

    # Specify the src to load the image
    img.src = "http://image.tmdb.org/t/p/w500".concat(path)


class MyFacebookApp 
  constructor: ->
  doSomething: () ->
    console.log "I'm doing something over here."
    FB.login ->
      FB.api '/me/friends', (response) ->
        console.log response

window.myFacebookApp = new MyFacebookApp()
