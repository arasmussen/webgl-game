define(['Cube'], function(Cube) {
  return Base.extend({
    init: function() {
      this.cubes = [];
      for (var x = -10; x < 10; x++) {
        for (var y = -2; y < -1; y++) {
          for (var z = -10; z < 10; z++) {
            var cube = new Cube({x: 2 * x, y: y, z: 2 * z});
            cube.init();
            this.cubes.push(cube);
          }
        }
      }
    },

    draw: function(mvMatrix, pMatrix) {
      for (var i = 0; i < 20 * 20; i++) {
        this.cubes[i].draw(mvMatrix, pMatrix);
      }
    }
  });
});

