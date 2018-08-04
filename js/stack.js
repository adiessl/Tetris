class Stack {

  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.matrix = [];
    this.initialize();
  }

  initialize() {
    for (let row = 0; row < this.rows; row++) {
      this.addRow();
    }
  }

  add(tile) {
    const x = tile.x;
    const y = tile.y;
    const blocks = tile.blocks;
    for (let i = 0, ii = blocks.length; i < ii; i++) {
      const block = blocks[i];
      const yValue = y + block.offsetY;
      const xValue = x + block.offsetX;

      if (yValue <= 0) {
        GameOver();
        return;
      }
      this.matrix[yValue][xValue] = new Block(0, 0, block.hexColor);
    }

    this.removeFullRows();
  }

  draw(edgeLength, offsetX, offsetY) {
    for (let rowNumber = 0; rowNumber < this.rows; rowNumber++) {
      const row = this.matrix[rowNumber];
      for (let colNumber = 0; colNumber < this.columns; colNumber++) {
        const block = row[colNumber];
        if (block instanceof Block) {
          block.draw(colNumber, rowNumber, edgeLength, offsetX, offsetY)
        }
      }
    }
  }

  removeFullRows() {
    let removedRowCount = 0;
    for (let i = 0; i < this.rows; i++) {
      const row = this.matrix[i];
      let fullRow = true;
      for (let j = 0; j < this.columns; j++) {
        const element = row[j];
        if (!(element instanceof Block)) {
          fullRow = false;
          break;
        }
      }
      if (fullRow) {
        this.matrix.splice(i, 1);
        removedRowCount += 1;
        this.addRow();
      }
    }
    AddToScore(removedRowCount);
  }

  addRow() {
    const row = [];
    row.length = this.columns;
    this.matrix.unshift(row);
  }

  isOccupied(rowNumber, colNumber) {
    if (rowNumber >= this.rows) {
      return true;
    } else if (rowNumber < 0) {
      return false;
    }

    if (colNumber < 0 || colNumber >= this.columns) {
      return true;
    }

    return this.matrix[rowNumber][colNumber] instanceof Block;
  }
}
