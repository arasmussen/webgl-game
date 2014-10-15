define([
    'gl',
    'CubeGrid',
    'ShaderManager',
    'TextureManager',
    'RenderingEngine',
    'InputManager'
  ],
  function(gl,
           CubeGrid,
           ShaderManager,
           TextureManager,
           RenderingEngine,
           InputManager) {
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
        var canvas = document.getElementById('canvas');

        // initialize the rendering engine
        RenderingEngine.init();
        InputManager.init(canvas);

        // create a cube box and add it to the rendering engine
        this.cubeGrid = new CubeGrid();
        this.cubeGrid.init();
        RenderingEngine.addEntity(this.cubeGrid);

        // start the game loop
        this.startGameLoop();
      },

      startGameLoop: function() {
        requestAnimationFrame(this.gameLoop.bind(this));
      },

      gameLoop: function() {
        this.handleInput();
        this.updateWorld();
        this.drawWorld();
        requestAnimationFrame(this.gameLoop.bind(this));
      },

      handleInput: function() {
        InputManager.processInput();
      },

      updateWorld: function() {
        var tslf = 0.016;
        this.cubeGrid.move(tslf);
        RenderingEngine.update(tslf);
      },

      drawWorld: function() {
        // tell the rendering engine to reset itself for a new frame
        RenderingEngine.startFrame();

        // draw all the objects
        RenderingEngine.draw();
      },
    });
  }
);
