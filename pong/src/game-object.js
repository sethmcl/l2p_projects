export default class GameObject {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
  }

  render(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
