function randomNumberGenerator (min, max) {
  return (min + (Math.random() * (max - min)));
}
var EXPLOSION_COLORS = ["#FF0000", "#525252", "#FFA318"];

function Particle (square) {
  this.scale = 1;

  //in the middle of the square
  this.x = (square.xPos * 30) + 15;
  this.y = (square.yPos * 30) + 15;
  this.velocityX = randomNumberGenerator(60.0, 100.0);
  this.velocityY = randomNumberGenerator(60.0, 100.0);
  this.radius = randomNumberGenerator(5, 15);
  this.scaleSpeed = randomNumberGenerator(1, 4);
  var i = Math.floor(Math.random() * 3);
  this.color = EXPLOSION_COLORS[i];
}


Particle.prototype.update = function (ms) {
  this.scale -= this.scaleSpeed * ms / 1000.0;
  if (this.scale <= 0) {
    this.scale = 0;
  }

  this.x += this.velocityX * ms / 1000.0;
  this.y += this.velocityY * ms / 1000.0;
};

Particle.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.beginPath();
  ctx.arc(0, 0, (this.radius * this.scale), 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

Particle.prototype.isOutOfBounds = function (xBound, yBound) {
  var xMin = this.x - this.radius;
  var xMax = this.x + this.radius;
  var yMin = this.y - this.radius;
  var yMax = this.y + this.radius;

  if (xMin < 0 || yMin < 0 || xMax > xBound || yMax > yBound) {
    return true;
  } else {
    return false;
  }
};

var Explosion = function (squares, ctx) {
  this.particles = [];
  this.ctx = ctx;
  this.reps = 0;
  this.particlesPerSquare = 8;
  squares.forEach(function (square) {
    for (var i = 0; i < this.particlesPerSquare; i++) {
      this.particles.push(new Particle(square));
    }
  }.bind(this));
};

Explosion.prototype.createExplosion = function () {
  var speed = 50.0;
  var angle = 0.0;
  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles[i];
    particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
    particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
    angle += (360 / this.particlesPerSquare);
  }
};

Explosion.prototype.update = function (frameDelay) {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  var dimX = 30 * 12;
  var dimY = 30*20;
  if (this.reps >= 200) {
    window.clearInterval(this.intervalId);
  }
  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles[i];
    particle.update(frameDelay);
    if (particle.isOutOfBounds(dimX, dimY)) {
      continue;
    }
    particle.draw(this.ctx);
  }
  this.reps++;
};

module.exports = Explosion;
