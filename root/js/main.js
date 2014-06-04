requirejs.config({
  baseUrl: '/js'
});

requirejs(['Game'], function(Game) {
  var game = new Game();
  game.start();
});
