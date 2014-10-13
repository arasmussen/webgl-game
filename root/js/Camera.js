define(['InputManager', 'InputEventTypes'], function(InputManager, InputEventTypes) {
  return Base.extend({
    constructor: function() {
      this.position = {x: 0, y: 0, z: 0};
      this.rotation = {pitch: 0, yaw: 0};
      
      this.keysDown = {left: false, right: false, up: false, down: false};

      InputManager.subscribeKeyEvent(37, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'left'));
      InputManager.subscribeKeyEvent(65, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'left'));
      InputManager.subscribeKeyEvent(40, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'up'));
      InputManager.subscribeKeyEvent(83, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'up'));
      InputManager.subscribeKeyEvent(39, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'right'));
      InputManager.subscribeKeyEvent(68, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'right'));
      InputManager.subscribeKeyEvent(38, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'down'));
      InputManager.subscribeKeyEvent(87, InputEventTypes.onKeyDown, this.onKeyDown.bind(this, 'down'));
      InputManager.subscribeKeyEvent(37, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'left'));
      InputManager.subscribeKeyEvent(65, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'left'));
      InputManager.subscribeKeyEvent(40, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'up'));
      InputManager.subscribeKeyEvent(83, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'up'));
      InputManager.subscribeKeyEvent(39, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'right'));
      InputManager.subscribeKeyEvent(68, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'right'));
      InputManager.subscribeKeyEvent(38, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'down'));
      InputManager.subscribeKeyEvent(87, InputEventTypes.onKeyUp, this.onKeyUp.bind(this, 'down'));
    },

    onKeyDown: function(direction) {
      this.keysDown[direction] = true;
    },

    onKeyUp: function(direction) {
      this.keysDown[direction] = false;
    },

    update: function(tslf) {
      if (this.keysDown.left) {
        this.position.x -= 5 * tslf;
      }
      if (this.keysDown.right) {
        this.position.x += 5 * tslf;
      }
      if (this.keysDown.up) {
        this.position.z += 5 * tslf;
      }
      if (this.keysDown.down) {
        this.position.z -= 5 * tslf;
      }
    },

    applyTransform: function(mvMatrix) {
      // apply rotation transformation
      mat4.rotate(mvMatrix, -this.rotation.pitch, [1, 0, 0]);
      mat4.rotate(mvMatrix, -this.rotation.yaw, [0, 1, 0]);

      // then apply translation
      var translate = [
        -this.position.x,
        -this.position.y,
        -this.position.z
      ];
      mat4.translate(mvMatrix, translate);
    },
  });
});
