define(['gl', 'Cube'], function(gl, Cube) {
  var textureURLs = {
    'Grass': '/img/creeper.png'
  };
  var textures = {
  };

  return {
    init: function(cb) {
      var texturesToLoad = Object.keys(textureURLs).length;
      for (var textureName in textureURLs) {
        var textureURL = textureURLs[textureName];
        this._loadTexture(textureURL, function(texture) {
          textures[textureName] = texture;
          if (--texturesToLoad === 0) {
            cb();
          }
        });
      }
    },

    getTexture: function(textureName) {
      return textures[textureName];
    },

    _loadTexture: function(textureURL, cb) {
      var texture = gl.createTexture();
      texture.image = new Image();
      texture.image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        cb(texture);
      };
      texture.image.src = textureURL;
    }
  };
});
