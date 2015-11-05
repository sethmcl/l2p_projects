import Game from './game';

var canvas = document.querySelector('#my-canvas');

var g = new Game({
  canvas: canvas
});

g.start();
