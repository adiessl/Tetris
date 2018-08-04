function Tile(x, y, blocks) {
  this.x = x;
  this.y = y;
  this.blocks = blocks;

  this.setCoordinates = function (x, y) {
    this.x = x;
    this.y = y;
  }

  this.draw = function (edgeLength, offsetX, offsetY) {    
    for (var i = 0, ii = this.blocks.length; i < ii; i++) {
      this.blocks[i].draw(this.x, this.y, edgeLength, offsetX, offsetY);
    }
  }

  this.moveDown = function (stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveDown(this.x, this.y, stack);
    }, this)) {
      this.y += 1;
    } else {
      stack.add(this);
      NextTile();
    }
  }

  this.moveLeft = function (stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveLeft(this.x, this.y, stack);
    }, this)) {
      this.x -= 1;
    }
  }

  this.moveRight = function (stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveRight(this.x, this.y, stack);
    }, this)) {
      this.x += 1;
    }
  }

  this.rotateClockwise = function () {
    if (this.blocks.every(function (block) {
      return block.canRotateClockwise(this.x, this.y, stack);
    }, this)) {
     this.rotate(1);
    }
  }

  this.rotateCounterClockwise = function () {
    if (this.blocks.every(function (block) {
      return block.canRotateCounterClockwise(this.x, this.y, stack);
    }, this)) {
      this.rotate(-1);
    }
  }

  this.rotate = function (direction) {
    for (var i = 0, ii = this.blocks.length; i < ii; i++) {
      var block = this.blocks[i];
      var temp = block.offsetX;
      block.offsetX = -direction * block.offsetY;
      block.offsetY = direction * temp;
    }
  }
}