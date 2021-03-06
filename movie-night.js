// Generated by CoffeeScript 1.6.1
(function() {
  var DrawHelper, MoviePoster, MyFacebookApp;

  $(document).ready(function() {
    WebFont.load({
      google: {
        families: ['Tangerine']
      }
    });
    $.ajaxSetup({
      cache: true
    });
    $.ajax('http://api.themoviedb.org/3/movie/535/images?api_key=f9279dd427385129a3bf58fe314fa019', {
      type: 'GET',
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {
        return $('#root').append("AJAX Error: " + textStatus);
      },
      success: function(data, textStatus, jqXHR) {
        var back, _i, _len, _ref;
        $('#root').append("Successful AJAX call:");
        _ref = data.backdrops;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          back = _ref[_i];
          new MoviePoster(back.file_path);
        }
        return console.log(data);
      }
    });
    return $.getScript('http://connect.facebook.net/en_US/all.js', function() {
      FB.init({
        appId: 532820393483542,
        status: true,
        cookie: true,
        xfbml: false,
        oauth: true
      });
      return FB.getLoginStatus(myFacebookApp.doSomething);
    });
  });

  DrawHelper = (function() {

    function DrawHelper() {}

    DrawHelper.drawImage = function(canvas, img) {
      var ctx;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx = canvas.getContext('2d');
      return ctx.drawImage(img, 0, 0);
    };

    DrawHelper.getAverageRGB = function(canvas) {
      var ctx, data, height, length, width;
      height = canvas.height;
      width = canvas.width;
      ctx = canvas.getContext('2d');
      data = ctx.getImageData(0, 0, width, height);
      length = data.data.length;
      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      return rgb;
    };

    DrawHelper.drawText = function(canvas, title) {
      var bottom_font, ctx, shadow_color, text, text_color, top_font, width;
      ctx = canvas.getContext('2d');
      text_color = "rgba(255, 255, 255, 0.8)";
      shadow_color = "rgba(0, 0, 0, 1.0)";
      top_font = "54pt Tangerine";
      bottom_font = "54pt Tangerine";
      ctx.fillStyle = text_color;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      ctx.shadowColor = shadow_color;
      ctx.font = top_font;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      text = "Cuesta Theater Presents";
      width = ctx.measureText(text).width;
      ctx.fillText(text, (canvas.width - width) / 2, 30);
      ctx.font = bottom_font;
      width = ctx.measureText(title).width;
      return ctx.fillText(title, (canvas.width - width) / 2, 200);
    };

    return DrawHelper;

  })();

  MoviePoster = (function() {

    function MoviePoster(path) {
      var canvas, ctx, img;
      canvas = $(document.createElement('canvas'));
      $('#root').append(canvas);
      ctx = canvas[0].getContext('2d');
      img = $(document.createElement('img'))[0];
      img.onload = function() {
        DrawHelper.drawImage(canvas[0], img);
        return DrawHelper.drawText(canvas[0], "Flashdance");
      };
      img.src = "http://image.tmdb.org/t/p/w500".concat(path);
    }

    return MoviePoster;

  })();

  MyFacebookApp = (function() {

    function MyFacebookApp() {}

    MyFacebookApp.prototype.doSomething = function() {
      console.log("I'm doing something over here.");
      return FB.login(function() {
        return FB.api('/me/friends', function(response) {
          return console.log(response);
        });
      });
    };

    return MyFacebookApp;

  })();

  window.myFacebookApp = new MyFacebookApp();

}).call(this);
