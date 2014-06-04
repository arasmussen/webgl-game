define(['gl', 'Cube', 'ShaderManager', 'TextureManager'], function(gl, Cube, ShaderManager, TextureManager) {
  return Base.extend({
    start: function() {
      if (!gl) {
        console.error('gl couldnt load, quitting');
        return;
      }

      var asyncInits = 2;
      var asyncCallback = function() {
        if (--asyncInits === 0) {
          this.init();
        }
      }.bind(this);

      ShaderManager.init(asyncCallback);
      TextureManager.init(asyncCallback);
    },

    init: function() {
      var cube = new Cube();
      cube.init();

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);

      cube.draw();
    }
  });
});
