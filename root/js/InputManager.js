define(['InputEventTypes'], function(InputEventTypes) {
  return {
    subscriptions: {},

    init: function() {
      this.keysDown = {};
      this.keysUp = {};

      document.onkeydown = this.onKeyDown.bind(this);
      document.onkeyup = this.onKeyUp.bind(this);
      
      document.onmousedown = this.onMouseDown.bind(this);
      document.onmouseup = this.onMouseUp.bind(this);
      document.onmousemove = this.onMouseMove.bind(this);
    },

    subscribeKeyEvent: function(keyCode, eventType, cb) {
      if (!this.subscriptions[keyCode]) {
        this.subscriptions[keyCode] = [];
      }
      this.subscriptions[keyCode].push({
        eventType: eventType,
        callback: cb,
      });
    },

    processInput: function() {
      this.processKeyInput(InputEventTypes.onKeyDown, this.keysDown);
      this.processKeyInput(InputEventTypes.onKeyUp, this.keysUp);
      this.keysDown = {};
      this.keysUp = {};
    },

    processKeyInput: function(eventType, events) {
      for (var keyCode in events) {
        var keySubscriptions = this.subscriptions[keyCode];
        if (!keySubscriptions) {
          continue;
        }
        for (var j = 0; j < keySubscriptions.length; j++) {
          var keySubscription = keySubscriptions[j];
          if (keySubscription.eventType == eventType) {
            keySubscription.callback();
          }
        }
      }
    },

    onKeyDown: function(e) {
      this.keysDown[e.keyCode] = true;
    },

    onKeyUp: function(e) {
      this.keysUp[e.keyCode] = true;
    },

    onMouseDown: function(e) {
    }, 

    onMouseUp: function(e) {
    },

    onMouseMove: function(e) {
    },
  };
});
