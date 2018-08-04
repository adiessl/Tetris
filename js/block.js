class Block {

  constructor(offsetX, offsetY, hexColor) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.hexColor = hexColor;
  }

  draw(x, y, edgeLength, offsetX, offsetY) {
    fill(color(this.hexColor));
    stroke(0);
    rect((x + this.offsetX) * edgeLength + offsetX, (y + this.offsetY) * edgeLength + offsetY, edgeLength, edgeLength);
  };

  canMoveRight(parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, 1, 0);
  };

  canMoveLeft(parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, -1, 0);
  };

  canMoveDown(parentX, parentY, stack) {
    return this.canMove(parentX, parentY, stack, 0, 1);
  };

  canMove(parentX, parentY, stack, directionX, directionY) {
    const yValue = parentY + this.offsetY + directionY;
    const xValue = parentX + this.offsetX + directionX;
    return !stack.isOccupied(yValue, xValue);
  };

  canRotateClockwise(parentX, parentY, stack) {
    const direction = 1;
    const xValue = parentX - direction * this.offsetY;
    const yValue = parentY + direction * this.offsetX;
    return this.canRotate(parentX, parentY, stack, direction);
  };

  canRotateCounterClockwise(parentX, parentY, stack) {
    const direction = -1;
    const xValue = parentX - direction * this.offsetY;
    const yValue = parentY + direction * this.offsetX;
    return this.canRotate(parentX, parentY, stack, direction);
  };

  canRotate(parentX, parentY, stack, direction) {
    const xValue = parentX - direction * this.offsetY;
    const yValue = parentY + direction * this.offsetX;
    return !stack.isOccupied(yValue, xValue);
  };
}
