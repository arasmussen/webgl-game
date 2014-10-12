define(['gl', 'ShaderManager', 'Drawable'], function(gl, ShaderManager, Drawable) {
  var config = {
    shaderType: 'Cube',
    textures: ['Grass'],
    attribs: ['aVertexPosition', 'aTextureCoord'],
    uniforms: ['uPMatrix', 'uMVMatrix', 'uSampler']
  };

  return Drawable.extend({
    init: function() {
      Drawable.prototype.init.call(this, config);
    },

    draw: function() {
      Drawable.prototype.draw.call(this);
    },

    getVertexData: function() {
      return [
        -0.5, -0.5,  0.5,
          0.5, -0.5,  0.5,
          0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
          0.5,  0.5, -0.5,
          0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5,  0.5,  0.5,
          0.5,  0.5,  0.5,
          0.5,  0.5, -0.5,
        -0.5, -0.5, -0.5,
          0.5, -0.5, -0.5,
          0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5,
          0.5, -0.5, -0.5,
          0.5,  0.5, -0.5,
          0.5,  0.5,  0.5,
          0.5, -0.5,  0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
      ];
    },

    getTextureCoordData: function() {
      return [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
      ];
    },

    getIndexData: function() {
      return [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
      ];
    }
  });
});
