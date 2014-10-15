define(['InputEventTypes'], function(InputEventTypes) {
  return {
    pointerLocked: false,
    subscriptions: {
      onKeyUp : {},
      onKeyDown : {},
      onMouseMove : [],
    },


    init: function(canvas) {
      this.canvas = canvas;

      this.keysDown = {};
      this.keysUp = {};
      this.mouseMove = {x: 0, y: 0};

      // keyboard handlers
      document.onkeydown = this.onKeyDown.bind(this);
      document.onkeyup = this.onKeyUp.bind(this);

      // mouse handlers
      document.onmousedown = this.onMouseDown.bind(this);
      document.onmouseup = this.onMouseUp.bind(this);
      document.onmousemove = this.onMouseMove.bind(this);

      // pointer lock handler
      this.canvas.requestPointerLock =
        this.canvas.requestPointerLock ||
        this.canvas.mozRequestPointerLock ||
        this.canvas.webkitRequestPointerLock;
      this.canvas.onclick = this.onCanvasClicked.bind(this);
      document.onpointerlockchange = this.onPointerLockChange.bind(this);
      document.onmozpointerlockchange = this.onPointerLockChange.bind(this);
      document.onwebkitpointerlockchange = this.onPointerLockChange.bind(this);
    },

    subscribeKeyEvent: function(keyCode, eventType, cb) {
      if (!this.subscriptions[eventType][keyCode]) {
        this.subscriptions[eventType][keyCode] = [];
      }
      this.subscriptions[eventType][keyCode].push({
        callback: cb,
      });
    },

    subscribeMouseEvent: function(eventType, cb) {
      this.subscriptions[eventType].push({
        callback: cb,
      });
    },

    processInput: function() {
      // process input
      this.processKeyInput(InputEventTypes.onKeyDown, this.keysDown);
      this.processKeyInput(InputEventTypes.onKeyUp, this.keysUp);
      this.processMouseInput(InputEventTypes.onMouseMove, this.mouseMove);

      // clear input containers
      this.keysDown = {};
      this.keysUp = {};
      this.mouseMove = {x: 0, y: 0};
    },

    processKeyInput: function(eventType, events) {
      for (var keyCode in events) {
        var keySubscriptions = this.subscriptions[eventType][keyCode];
        if (!keySubscriptions) {
          continue;
        }
        for (var j = 0; j < keySubscriptions.length; j++) {
          var keySubscription = keySubscriptions[j];
          keySubscription.callback();
        }
      }
    },

    processMouseInput: function(eventType, events) {
      if (!this.pointerLocked) {
        return;
      }
      for (var i = 0; i < this.subscriptions[eventType].length; i++) {
        var mouseSubscription = this.subscriptions[eventType][i];
        mouseSubscription.callback({
          x: this.mouseMove.x,
          y: this.mouseMove.y
        });
      }
    },

    onCanvasClicked: function() {
      this.canvas.requestPointerLock();
    },

    onKeyDown: function(e) {
      this.keysDown[e.keyCode] = true;
    },

    onKeyUp: function(e) {
      this.keysUp[e.keyCode] = true;
    },

    onMouseDown: function(e) {
      if (!this.pointerLocked) {
        return;
      }
    },

    onMouseUp: function(e) {
      if (!this.pointerLocked) {
        return;
      }
    },

    onMouseMove: function(e) {
      if (!this.pointerLocked) {
        return;
      }
      var movement = {
        x: e.movementX || e.mozMovementX || e.webkitMovementX || 0,
        y: e.movementY || e.mozMovementY || e.webkitMovementY || 0,
      };
      this.mouseMove.x += movement.x;
      this.mouseMove.y += movement.y;
    },

    onPointerLockChange: function() {
      var lockElement =
        document.pointerLockElement ||
        document.mozPointerLockElement ||
        document.webkitPointerLockElement;

      if (lockElement === this.canvas) {
        this.pointerLocked = true;
      } else {
        this.pointerLocked = false;
      }
    },
  };
});
