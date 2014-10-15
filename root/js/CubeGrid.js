define(['Cube'], function(Cube) {
  return Base.extend({
    init: function() {
      this.cubes = [];
      for (var x = -10; x < 10; x++) {
        for (var z = -10; z < 10; z++) {
          y = Math.sin(x) + Math.sin(z);
          var cube = new Cube({x: 1.5 * x, y: y, z: 1.5 * z});
          cube.init();
          this.cubes.push(cube);
        }
      }

      this.t = 0;
    },

    draw: function(mvMatrix, pMatrix) {
      for (var i = 0; i < 20 * 20; i++) {
        this.cubes[i].draw(mvMatrix, pMatrix);
      }
    },

    move: function(tslf) {
      this.t += tslf;
      for (var x = -10; x < 10; x++) {
        for (var z = -10; z < 10; z++) {
          var i = (x + 10) * 20 + (z + 10);

          var cube = this.cubes[i];
          var y = Math.sin(x + this.t) + Math.sin(z + this.t);
          debugger;
          cube.position = {
            x: cube.position.x,
            y: y,
            z: cube.position.z
          };
        }
      }
    },
  });
});

