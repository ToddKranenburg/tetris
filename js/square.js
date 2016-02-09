(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var Square = Tetris.Square = function (position) {
    this.xPos = position[0];
    this.yPos = position[1];
  };

  Square.prototype.willHit = function (square) {
    if ((this.xPos === square.xPos) && ((this.yPos + 1) === square.yPos)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.willHitBottom = function (dim_y) {
    var bottom = dim_y || 20;
    if ((this.yPos + 1) === bottom) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.step = function () {
    this.yPos += 1;
  };

  Square.prototype.pivot = function (pivotSquare) {
    var deltaX = this.xPos - pivotSquare.xPos;
    var deltaY = this.yPos - pivotSquare.yPos;
    this.xPos = pivotSquare.xPos + deltaY;
    this.yPos = pivotSquare.yPos + deltaX;
  };

//there is a bug here...
  Square.prototype.willPivotIntoASide = function (pivotSquare) {
    var deltaX = this.xPos - pivotSquare.xPos;
    var deltaY = this.yPos - pivotSquare.yPos;
    var newX = pivotSquare.xPos + deltaY;
    var newY = pivotSquare.yPos + deltaX;

    if ((newX > 11 || newX < 0) || (newY > 19 || newY < 0)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.nudge = function (delta) {
    this.xPos += delta[0];
    this.yPos += delta[1];
  };

  Square.prototype.willHitASide = function (delta) {
    var newX = this.xPos + delta[0];
    if (newX > 11 || newX < 0) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.draw = function (ctx) {
    var x = this.xPos * 30;
    var y = this.yPos * 30;

    ctx.fillRect(x, y, 30, 30);
  };
})();
