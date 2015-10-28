var canvas = document.querySelector('#my-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

/**
 * @constructor
 * @param {object} config Object configuration
 * @param {number} config.width Object width
 * @param {number} config.height Object height
 * @param {number} config.x Object x
 * @param {number} config.y Object y
 * @param {string} config.shape Circle or rectangle
 * @param {number} config.xSpeed Speed object is moving on x axis
 * @param {number} config.ySpeed Speed object is moving on y axis
 */
function GameObject(config) {
  this.width = config.width;
  this.height = config.height;
  this.x = config.x;
  this.y = config.y;
  this.shape = config.shape;
  this.xSpeed = config.xSpeed || 0;
  this.ySpeed = config.ySpeed || 0;
}

var KEYS = {
  UP: 38,
  DOWN: 40
};

var keyboard = {
  isUpPressed: false,
  isDownPressed: false
};

var sprites = [];

// Create player paddle
var playerPaddle = new GameObject({
  width: 30,
  height: 150,
  x: 10,
  y: 10,
  ySpeed: 3,
  shape: 'rectangle'
});

playerPaddle.update = function () {
  if (keyboard.isUpPressed && this.y >= 0) {
    this.y -= this.ySpeed;
  }

  if (keyboard.isDownPressed && this.y <= (canvas.height - this.height)) {
    this.y += this.ySpeed;
  }
};

sprites.push(playerPaddle);

// Create enemy paddle
var enemyPaddle = new GameObject({
  width: 30,
  height: 150,
  x: canvas.width - 50,
  y: 300,
  shape: 'rectangle',
  ySpeed: 1
});

enemyPaddle.update = function () {
  if (playerPaddle.y < this.y) {
    this.y -= this.ySpeed;
  }

  if (playerPaddle.y > this.y) {
    this.y += this.ySpeed;
  }

};

sprites.push(enemyPaddle);

// Create the ball
var ball = new GameObject({
  width: 55,
  height: 75,
  x: canvas.width / 2,
  y: canvas.height / 2,
  shape: 'circle',
  xSpeed: 3,
  ySpeed: 3
});

ball.update = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  if (this.y > canvas.height) {
    this.ySpeed = -this.ySpeed;
  }

  if (isCollision(this, enemyPaddle)) {

  }
}

sprites.push(ball);

// Collision function
function isCollision(a, b) {
  var aXMiddle = a.x + a.width / 2;
  var aYMiddle = a.y + a.height / 2;

  var bXMiddle = b.x + b.width / 2;
  var bYMiddle = b.y + b.height / 2;

  // if (aXMiddle > b=== bXMiddle && aYMiddle === bYMiddle)
}

// Hook up keyboard events
window.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case KEYS.UP:
      keyboard.isUpPressed = true;
      break;
    case KEYS.DOWN:
      keyboard.isDownPressed = true;
      break;
  }
});

window.addEventListener('keyup', function (e) {
  switch (e.keyCode) {
    case KEYS.UP:
      keyboard.isUpPressed = false;
      break;
    case KEYS.DOWN:
      keyboard.isDownPressed = false;
      break;
  }
});

gameLoop();

function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

function update() {
  sprites.forEach(function (sprite) {
    if (typeof sprite.update === 'function') {
      sprite.update();
    }
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sprites.forEach(function (sprite) {
    if (sprite.shape === 'rectangle') {
      ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
    } else if (sprite.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(sprite.x, sprite.y, sprite.width / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
}
