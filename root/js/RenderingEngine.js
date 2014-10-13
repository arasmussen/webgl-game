define(['gl', 'Camera'], function(gl, Camera) {
  return {
    init: function() {
      this.mvMatrix = mat4.create();
      this.pMatrix = mat4.create();
      this.camera = new Camera();
      this.entities = [];

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);

    },

    addEntity: function(entity) {
      this.entities.push(entity);
    },

    startFrame: function() {
      // reset matrices to identity
      mat4.identity(this.mvMatrix);
      mat4.perspective(
        45,
        gl.viewportWidth / gl.viewportHeight,
        0.1,
        100.0,
        this.pMatrix
      );

      // apply camera transform first
      this.camera.applyTransform(this.mvMatrix);
    },

    update: function(tslf) {
      this.camera.update(tslf);
    },

    draw: function() {
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      for (var i = 0; i < this.entities.length; i++) {
        var entity = this.entities[i];
        entity.draw(this.mvMatrix, this.pMatrix);
      }
    },
  };
});
