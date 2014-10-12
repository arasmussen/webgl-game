define(['Cube'], function(Cube) {

  return Base.extend({
    init: function() {
      this.cubes = [];
      for (var x = 0; x < 8; x++) {
        for (var y = -10; y < -2; y++) {
          for (var z = -28; z < -20; z++) {
            var cube = new Cube([x, y, z]);
            cube.init();
            this.cubes.push(cube);
          }
        }
      }
    },

    draw: function() {
      for (var i = 0; i < 8 * 8 * 8; i++) {
        this.cubes[i].draw();
      }
    }
  });
});

