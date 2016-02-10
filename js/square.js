(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var Square = Tetris.Square = function (position, board) {
    this.xPos = position[0];
    this.yPos = position[1];
    this.board = board;
    this.color = null;
  };

  Square.prototype.setColor = function (color) {
    this.color = color;
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
    if ((this.yPos + 1) >= bottom) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.step = function () {
    this.yPos += 1;
  };


  Square.prototype.pivot = function (pivotSquare) {
    var position = this.getPivotPosition(pivotSquare);
    this.xPos = position[0];
    this.yPos = position[1];
  };


  Square.prototype.willPivotIntoASide = function (pivotSquare) {
    var position = this.getPivotPosition(pivotSquare);

    if (this.board.isOutOfBounds(position)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.willPivotIntoASquare = function (pivotSquare) {
    var position = this.getPivotPosition(pivotSquare);

    if (this.board.isOccupied(position)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.getPivotPosition = function (pivotSquare) {
    var deltaX = this.xPos - pivotSquare.xPos;
    var deltaY = this.yPos - pivotSquare.yPos;
    var newX = pivotSquare.xPos - deltaY;
    var newY = pivotSquare.yPos + deltaX;

    return [newX, newY];
  };

  Square.prototype.nudge = function (delta) {
    this.xPos += delta[0];
    this.yPos += delta[1];
  };

  Square.prototype.willHitASide = function (delta) {
    var position = [this.xPos + delta[0], this.yPos + delta[1]];
    if (this.board.isOutOfBounds(position)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.willHitASquare = function (delta) {
    var position = [this.xPos + delta[0], this.yPos + delta[1]];
    if (this.board.isOccupied(position)) {
      return true;
    } else {
      return false;
    }
  };

  Square.prototype.draw = function (ctx) {
    var x = this.xPos * 30;
    var y = this.yPos * 30;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, 30, 30);
  };
})();
