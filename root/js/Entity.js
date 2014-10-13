define(['gl', 'ShaderManager', 'TextureManager'], function(gl, ShaderManager, TextureManager) {
  var mvMatrix = mat4.create();
  var pMatrix = mat4.create();

  return Base.extend({
    constructor: function(position, rotation) {
      this.buffers = {};
      this.textures = {};
      this.position = position ? position : {x: 0, y: 0, z: 0};
      this.rotation = rotation ? rotation : {pitch: 0, yaw: 0}
    },

    init: function(config) {
      this.config = config;
      this._initShaders();
      this._initBuffers();
      this._initTextures();
    },

    _initShaders: function() {
      this.shaderProgram = ShaderManager.getShader(this.config.shaderType);

      gl.useProgram(this.shaderProgram);

      this.shaderProgram.attribs = {};
      for (var i in this.config.attribs) {
        var attrib = this.config.attribs[i];
        this.shaderProgram.attribs[attrib] = gl.getAttribLocation(this.shaderProgram, attrib);
        gl.enableVertexAttribArray(this.shaderProgram.attribs[attrib]);
      }

      this.shaderProgram.uniforms = {};
      for (var i in this.config.uniforms) {
        var uniform = this.config.uniforms[i];
        this.shaderProgram.uniforms[uniform] = gl.getUniformLocation(this.shaderProgram, uniform);
      }
    },

    _initBuffers: function() {
      this.buffers['Vertex'] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['Vertex']);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getVertexData()), gl.STATIC_DRAW);
      this.buffers['Vertex'].itemSize = 3;
      this.buffers['Vertex'].numItems = 24;

      this.buffers['TextureCoord'] = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['TextureCoord']);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getTextureCoordData()), gl.STATIC_DRAW);
      this.buffers['TextureCoord'].itemSize = 2;
      this.buffers['TextureCoord'].numItems = 24;

      this.buffers['Index'] = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers['Index']);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndexData()), gl.STATIC_DRAW);
      this.buffers['Index'].itemSize = 1;
      this.buffers['Index'].numItems = 36;
    },

    _initTextures: function() {
      for (var i = 0; i < this.config.textures.length; i++) {
        var textureName = this.config.textures[i];
        this.textures[textureName] = TextureManager.getTexture(textureName);
      }
    },

    preDraw: function(mvMatrix) {
      var translate = [this.position.x, this.position.y, this.position.z];
      mat4.translate(mvMatrix, translate);
      mat4.rotate(mvMatrix, this.rotation.yaw, [0, 1, 0]);
      mat4.rotate(mvMatrix, this.rotation.pitch, [1, 0, 0]);
    },

    postDraw: function(mvMatrix) {
      var translate = [-this.position.x, -this.position.y, -this.position.z];
      mat4.rotate(mvMatrix, -this.rotation.pitch, [1, 0, 0]);
      mat4.rotate(mvMatrix, -this.rotation.yaw, [0, 1, 0]);
      mat4.translate(mvMatrix, translate);
    },

    draw: function(mvMatrix, pMatrix) {
      this.preDraw(mvMatrix);

      gl.useProgram(this.shaderProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['Vertex']);
      gl.vertexAttribPointer(this.shaderProgram.attribs['aVertexPosition'], this.buffers['Vertex'].itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['TextureCoord']);
      gl.vertexAttribPointer(this.shaderProgram.attribs['aTextureCoord'], this.buffers['TextureCoord'].itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures['Grass']);
      gl.uniform1i(this.shaderProgram.uniforms['uSampler'], 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers['Index']);
      gl.uniformMatrix4fv(this.shaderProgram.uniforms['uMVMatrix'], false, mvMatrix);
      gl.uniformMatrix4fv(this.shaderProgram.uniforms['uPMatrix'], false, pMatrix);
      gl.drawElements(gl.TRIANGLES, this.buffers['Index'].numItems, gl.UNSIGNED_SHORT, 0);

      this.postDraw(mvMatrix);
    }
  });
});
