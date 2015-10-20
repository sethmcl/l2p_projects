var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var ball = {
  x: 300,
  y: 300,
  width: 50,
  height: 50
};

var playerPaddle = {
  x: 75,
  y: 150,
  width: 50,
  height: 150
};

var opponentPaddle = {
  x: canvas.width - 50,
  y: 150,
  width: 50,
  height: 150
};

gameLoop();

function gameLoop() {
  update();
  render();
  window.requestAnimationFrame(gameLoop);
}

function update() {
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  renderBoard();
  renderPlayerPaddle();
  renderOpponentPaddle();
  renderBall();

}

function renderBoard() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayerPaddle() {
  ctx.fillStyle = 'black';
  ctx.fillRect(
    playerPaddle.x - (playerPaddle.width / 2),
    playerPaddle.y - (playerPaddle.height / 2),
    playerPaddle.width,
    playerPaddle.height
  );
}

function renderOpponentPaddle() {
  ctx.fillStyle = 'black';
  ctx.fillRect(
    opponentPaddle.x - (opponentPaddle.width / 2),
    opponentPaddle.y - (opponentPaddle.height / 2),
    opponentPaddle.width,
    opponentPaddle.height
  );
}

function renderBall() {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.width / 2, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
