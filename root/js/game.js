define(['gl', 'CubeBox', 'ShaderManager', 'TextureManager'], function(gl, CubeBox, ShaderManager, TextureManager) {
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
      this.cubebox = new CubeBox();
      this.cubebox.init();

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);

      this.position = {x: 0.0, y: 0.0, z: 0.0};
      this.rotation = {
        pitch: 0,
        yaw: 0
      };

      this.startGameLoop();
    },

    startGameLoop: function() {
      this.updateCamera();
      this.draw();
      setTimeout(this.startGameLoop.bind(this), 10);
    },

    updateCamera: function() {
      var translate = [
        -this.position.x,
        -this.position.y,
        -this.position.z
      ];
      mat4.rotate(mvMatrix, -this.rotation.pitch, [1, 0, 0]);
      mat4.rotate(mvMatrix, -this.rotation.yaw, [0, 1, 0]);
      mat4.translate(mvMatrix, translate);
    },

    draw: function() {
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      this.cubebox.draw();
    },
  });
});
