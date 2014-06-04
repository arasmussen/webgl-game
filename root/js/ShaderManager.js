define(['gl', 'Cube'], function(gl, Cube) {
  var shaderURLSets = {
    'Cube': {
      vertex: '/glsl/vertex.glsl',
      fragment: '/glsl/fragment.glsl'
    }
  };
  var shaderPrograms = {};

  return {
    init: function(cb) {
      var shadersToLoad = Object.keys(shaderURLSets).length;
      for (var objectType in shaderURLSets) {
        var shaderURLs = shaderURLSets[objectType];
        this._loadShaders(shaderURLs, function(shaderProgram) {
          shaderPrograms[objectType] = shaderProgram;
          if (--shadersToLoad === 0) {
            cb();
          }
        });
      }
    },

    getShader: function(objectType) {
      return shaderPrograms[objectType];
    },

    _loadShaders: function(shaderURLs, cb) {
      if (!shaderURLs.vertex || !shaderURLs.fragment) {
        console.error('missing vertex or fragment shader');
        cb(null);
        return;
      }

      var vertexSource = null;
      var fragmentSource = null;

      $.ajax({
        url: shaderURLs.vertex
      }).done(function(data) {
        vertexSource = data;
        if (fragmentSource) {
          this._compileShaders(vertexSource, fragmentSource, cb);
        }
      }.bind(this));

      $.ajax({
        url: shaderURLs.fragment
      }).done(function(data) {
        fragmentSource = data;
        if (vertexSource) {
          this._compileShaders(vertexSource, fragmentSource, cb);
        }
      }.bind(this));
    },

    _compileShaders: function(vertexSource, fragmentSource, cb) {
      var vertexShader = this._getShader(vertexSource, gl.VERTEX_SHADER);
      var fragmentShader = this._getShader(fragmentSource, gl.FRAGMENT_SHADER);

      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('could not initialize shaders');
      }

      cb(shaderProgram);
    },

    _getShader: function(source, shaderType) {
      if (!source) {
        return null;
      }

      var shader = gl.createShader(shaderType);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    }
  };
});
