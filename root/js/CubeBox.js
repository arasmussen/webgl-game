define(['Cube'], function(Cube) {
  return Base.extend({
    init: function() {
      this.cubes = [];
      for (var x = -30; x < 30; x++) {
        for (var y = -2; y < -1; y++) {
          for (var z = -30; z < 30; z++) {
            var cube = new Cube({x: x, y: y, z: z});
            cube.init();
            this.cubes.push(cube);
          }
        }
      }
    },

    draw: function(mvMatrix, pMatrix) {
      for (var i = 0; i < 60 * 60; i++) {
        this.cubes[i].draw(mvMatrix, pMatrix);
      }
    }
  });
});

