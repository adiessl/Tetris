function Block(offsetX, offsetY, hexColor) {
  this.offsetX = offsetX;
  this.offsetY = offsetY;
  this.hexColor = hexColor;

  this.draw = function (x, y, edgeLength, offsetX, offsetY) {
    fill(color(this.hexColor));
    stroke(0);
    rect((x + this.offsetX) * edgeLength + offsetX, (y + this.offsetY) * edgeLength + offsetY, edgeLength, edgeLength)
  }

  this.canMoveRight = function (parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, 1, 0);
  }

  this.canMoveLeft = function (parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, -1, 0);
  }

  this.canMoveDown = function (parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, 0, 1);
  }

  this.canMove = function (parentX, parentY, stack, directionX, directionY) {
    yValue = parentY + this.offsetY + directionY;
    xValue = parentX + this.offsetX + directionX;
    return !stack.isOccupied(yValue, xValue);
  }

  this.canRotateClockwise = function (parentX, parentY, stack) {    
    var direction = 1;
    xValue = parentX - direction * this.offsetY;
    yValue = parentY + direction * this.offsetX;
    return this.canRotate(parentX, parentY, stack, direction);
  }

  this.canRotateCounterClockwise = function (parentX, parentY, stack) {    
    var direction = -1;
    xValue = parentX - direction * this.offsetY;
    yValue = parentY + direction * this.offsetX;
    return this.canRotate(parentX, parentY, stack, direction);
  }

  this.canRotate = function (parentX, parentY, stack, direction) {    
    xValue = parentX - direction * this.offsetY;
    yValue = parentY + direction * this.offsetX;
    return !stack.isOccupied(yValue, xValue);
  }
}
