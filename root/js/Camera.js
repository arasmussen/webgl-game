var MOVE_SPEED = 8;

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

      InputManager.subscribeMouseEvent(InputEventTypes.onMouseMove, this.onMouseMove.bind(this));
    },

    onKeyDown: function(direction) {
      this.keysDown[direction] = true;
    },

    onKeyUp: function(direction) {
      this.keysDown[direction] = false;
    },

    onMouseMove: function(mouseMove) {
      // update pitch
      var pitch = this.rotation.pitch - mouseMove.y * 0.004;
      if (pitch > Math.PI / 2) {
        pitch = Math.PI / 2;
      } else if (pitch < -Math.PI / 2) {
        pitch = -Math.PI / 2;
      }

      // update yaw
      var yaw = this.rotation.yaw - mouseMove.x * 0.004;
      if (yaw < -Math.PI) {
        yaw += 2 * Math.PI;
      } else if (yaw > Math.PI) {
        yaw -= 2 * Math.PI;
      }

      // set values
      this.rotation.pitch = pitch;
      this.rotation.yaw = yaw;
    },


    update: function(tslf) {
      var walk = this.keysDown.up ? 1 : 0 + this.keysDown.down ? -1 : 0;
      var strafe = this.keysDown.left ? -1 : 0 + this.keysDown.right ? 1 : 0;
      var velocity = {
        x: strafe * Math.cos(this.rotation.yaw) +
          Math.cos(this.rotation.pitch) * walk * Math.sin(this.rotation.yaw),
        y: -walk * Math.sin(this.rotation.pitch),
        z: -strafe * Math.sin(this.rotation.yaw) +
          Math.cos(this.rotation.pitch) * walk * Math.cos(this.rotation.yaw),
      };
      this.position.x += velocity.x * tslf * MOVE_SPEED;
      this.position.y += velocity.y * tslf * MOVE_SPEED;
      this.position.z += velocity.z * tslf * MOVE_SPEED;
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
