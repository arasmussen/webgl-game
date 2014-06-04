define(['gl', 'ShaderManager', 'TextureManager'], function(gl, ShaderManager, TextureManager) {
  var mvMatrix = mat4.create();
  var pMatrix = mat4.create();

  return Base.extend({
    constructor: function(config) {
      this.config = config;
      this.buffers = {};
      this.textures = {};
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

    draw: function() {
      gl.useProgram(this.shaderProgram);

      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, [2.5, -2.5, -10.0]);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['Vertex']);
      gl.vertexAttribPointer(this.shaderProgram.attribs['aVertexPosition'], this.buffers['Vertex'].itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['TextureCoord']);
      gl.vertexAttribPointer(this.shaderProgram.attribs['aTextureCoord'], this.buffers['TextureCoord'].itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures['Grass']);
      gl.uniform1i(this.shaderProgram.uniforms['uSampler'], 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers['Index']);
      gl.uniformMatrix4fv(this.shaderProgram.uniforms['uPMatrix'], false, pMatrix);
      gl.uniformMatrix4fv(this.shaderProgram.uniforms['uMVMatrix'], false, mvMatrix);
      gl.drawElements(gl.TRIANGLES, this.buffers['Index'].numItems, gl.UNSIGNED_SHORT, 0);
    }
  });
});
