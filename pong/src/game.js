import Paddle from './paddle';

export default class Game {

  /**
   * @param {object} config
   * @param {HTMLElement} config.canvas
   */
  constructor(config = {}) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.makeCanvasFillScreen();
    window.addEventListener('resize', this.makeCanvasFillScreen.bind(this));
  }

  makeCanvasFillScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.gameObjects = this.createGameObjects();
    this.gameLoop();
  }

  createGameObjects() {
    var gameObjects = [];

    // Create player paddle
    var playerPaddle = new Paddle({
      x: 10,
      y: 10,
      width: 50,
      height: 150
    });

    gameObjects.push(playerPaddle);
    return gameObjects;
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update() {

  }

  render() {
    this.gameObjects.forEach(gameObject => gameObject.render(this.ctx));
  }

}
