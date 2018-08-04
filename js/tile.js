class Tile {

  constructor(x, y, blocks) {
    this.x = x;
    this.y = y;
    this.blocks = blocks;
  }

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(edgeLength, offsetX, offsetY) {
    for (let i = 0, ii = this.blocks.length; i < ii; i++) {
      this.blocks[i].draw(this.x, this.y, edgeLength, offsetX, offsetY);
    }
  }

  moveDown(stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveDown(this.x, this.y, stack);
    }, this)) {
      this.y += 1;
    } else {
      stack.add(this);
      NextTile();
    }
  }

  moveLeft(stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveLeft(this.x, this.y, stack);
    }, this)) {
      this.x -= 1;
    }
  }

  moveRight(stack) {
    if (this.blocks.every(function (block) {
      return block.canMoveRight(this.x, this.y, stack);
    }, this)) {
      this.x += 1;
    }
  }

  rotateClockwise() {
    if (this.blocks.every(function (block) {
      return block.canRotateClockwise(this.x, this.y, stack);
    }, this)) {
      this.rotate(1);
    }
  }

  rotateCounterClockwise() {
    if (this.blocks.every(function (block) {
      return block.canRotateCounterClockwise(this.x, this.y, stack);
    }, this)) {
      this.rotate(-1);
    }
  }

  rotate(direction) {
    for (let i = 0, ii = this.blocks.length; i < ii; i++) {
      const block = this.blocks[i];
      const temp = block.offsetX;
      block.offsetX = -direction * block.offsetY;
      block.offsetY = direction * temp;
    }
  }
}
