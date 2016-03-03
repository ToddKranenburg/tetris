var IPiece = require("./i_piece"),
  Square = require('./square').Square,
  Pieces = require('./i_piece'),
  GhostPiece = require('./ghost_piece'),
  Explosion = require('./explosion');

var Board = function () {
  var i = Math.floor(Math.random() * 7);
  this.movingPiece = new Pieces[i](this);//change this when you add more pieces
  var squares = this.movingPiece.getSquares();
  this.ghostPiece = new GhostPiece(squares, this);
  this.stationarySquares = {};
  this.rowsToExplode = [];
};

Board.prototype.step = function () {
  if (this.pieceWillHit()) {
    this.pieceDidHit();
  } else {
    this.movingPiece.step();
  }

  return this.rowsToExplode.length;
};

Board.prototype.forceFall = function (ctx, expCtx) {
  this.movingPiece.moveTo(this.ghostPiece);
  this.draw(ctx, expCtx);
};

Board.prototype.nudge = function (direction) {
  this.movingPiece.nudge(direction);
  this.ghostPiece.setSquares(this.movingPiece.getSquares());
};

Board.prototype.rotate = function () {
  this.movingPiece.rotate();
  this.ghostPiece.setSquares(this.movingPiece.getSquares());
};

Board.prototype.pieceDidHit = function () {
  this.movingPiece.getSquares().forEach(function (square) {
    var yPos = square.yPos;
    this.stationarySquares[yPos] = this.stationarySquares[yPos] || [];
    this.stationarySquares[yPos].push(square);
  }.bind(this));
  this.destroyFullRows();
  if (!this.gameIsOver()) {
    var i = Math.floor(Math.random() * 7);
    this.movingPiece = new Pieces[i](this);
    var squares = this.movingPiece.getSquares();
    this.ghostPiece = new GhostPiece(squares, this);
  }
};

Board.prototype.pieceWillHit = function () {
  var squares = this.getStationarySquares();
  if (this.movingPiece.willHit(squares)) {
    return true;
  } else if (this.movingPiece.willHitBottom()) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.getStationarySquares = function () {
  var keys = Object.keys(this.stationarySquares);
  var squares = [];
  keys.forEach(function (key) {
    this.stationarySquares[key].forEach(function (square) {
      squares.push(square);
    });
  }.bind(this));

  return squares;
};

Board.prototype.draw = function (ctx, explosionCtx) {
  ctx.clearRect(0, 0, 30 * 12, 30 * 20);
  ctx.strokeStyle = "#01cccc";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 30 * 12, 30 * 20);
  var rowsToExplode = this.rowsToExplode;
  if (this.rowsToExplode.length > 0) {
    this.flashRows(rowsToExplode, explosionCtx);
    this.rowsToExplode = [];
  }
  this.movingPiece.getSquares().forEach(function (square) {
    square.draw(ctx);
  });

  this.ghostPiece.resetSquares();
  this.ghostPiece.moveToBottom();
  this.ghostPiece.getSquares().forEach(function (square) {
    square.drawGhost(ctx);
  });

  var squares = this.getStationarySquares();
  squares.forEach(function (square) {
    square.draw(ctx);
  });
};

Board.prototype.destroyFullRows = function () {
  var keys = Object.keys(this.stationarySquares);
  var deletedRowHeights = [];
  keys.forEach(function (key) {
    var row = this.stationarySquares[key];
    if (this.rowIsFull(row)) {
      this.rowsToExplode.push(row);
      deletedRowHeights.push(row[0].yPos);
      delete this.stationarySquares[key];
    }
  }.bind(this));

  var deletedRows = 0;
  for (var i = 0; i < deletedRowHeights.length; i++) {
    var deletedRowHeight = deletedRowHeights[i];
    this.shiftAllRows(deletedRowHeight + deletedRows);
    deletedRows++;
  }
};

Board.prototype.flashRows = function (rows, ctx) {
  var squares = [];
  rows.forEach(function (row) {
    row.forEach(function (square) {
      squares.push(square);
    });
  });

  var explosion = new Explosion(squares, ctx);
  explosion.createExplosion();

  explosion.intervalId = window.setInterval(function () {
    explosion.update(10);
  }, 10);
};


Board.prototype.shiftAllRows = function (deletedRowHeight) {
  var keys = Object.keys(this.stationarySquares);
  keys.sort(function (a, b) {
    return b - a;
  });
  keys.forEach(function (key) {
    if (key < deletedRowHeight) {
      this.shiftSingleRow(key);
    }
  }.bind(this));
};

Board.prototype.shiftSingleRow = function (rowHeight) {
  var row = this.stationarySquares[rowHeight];
  row.forEach(function (square) {
    square.step();
  });
  delete this.stationarySquares[rowHeight];

  this.stationarySquares[parseInt(rowHeight) + 1] = row;
};

Board.prototype.rowIsFull = function (row) {
  if (row.length === 12) {
    return true;
  } else {
    return false;
  }
};

Board.prototype.isOccupied = function (position) {
  var row = this.stationarySquares[position[1]] || [];
  var occupied = false;
  row.forEach(function (square) {
    if (square.xPos == position[0]) {
      occupied = true;
      return;
    }
  });

  return occupied;
};

Board.prototype.gameIsOver = function () {
  if (this.stationarySquares[0]) {
    return true;
  }

  return false;
};

Board.prototype.isOutOfBounds = function (position) {
  var x = position[0];
  var y = position[1];

  if (x > 11 || x < 0) {
    return true;
  }
  if (y > 19 || y < 0) {
    return true;
  }

  return false;
};

module.exports = Board;
