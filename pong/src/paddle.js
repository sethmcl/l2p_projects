import GameObject from './game-object';

export default class Paddle extends GameObject {

  render(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
