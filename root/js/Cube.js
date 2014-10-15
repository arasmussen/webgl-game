define([
    'gl',
    'ShaderManager',
    'Entity'
  ], function(gl, ShaderManager, Entity) {
    var config = {
      shaderType: 'Cube',
      textures: ['Grass'],
      attribs: ['aVertexPosition', 'aTextureCoord'],
      uniforms: ['uPMatrix', 'uMVMatrix', 'uSampler']
    };

    return Entity.extend({
      init: function() {
        Entity.prototype.init.call(this, config);
      },

      getVertexData: function() {
        return [
          -0.3, -0.3,  0.3,
            0.3, -0.3,  0.3,
            0.3,  0.3,  0.3,
          -0.3,  0.3,  0.3,
          -0.3, -0.3, -0.3,
          -0.3,  0.3, -0.3,
            0.3,  0.3, -0.3,
            0.3, -0.3, -0.3,
          -0.3,  0.3, -0.3,
          -0.3,  0.3,  0.3,
            0.3,  0.3,  0.3,
            0.3,  0.3, -0.3,
          -0.3, -0.3, -0.3,
            0.3, -0.3, -0.3,
            0.3, -0.3,  0.3,
          -0.3, -0.3,  0.3,
            0.3, -0.3, -0.3,
            0.3,  0.3, -0.3,
            0.3,  0.3,  0.3,
            0.3, -0.3,  0.3,
          -0.3, -0.3, -0.3,
          -0.3, -0.3,  0.3,
          -0.3,  0.3,  0.3,
          -0.3,  0.3, -0.3,
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
  }
);
