function Stack(columns, rows) {
  this.columns = columns;
  this.rows = rows;
  this.matrix = [];

  this.initialize = function () {
    for (var row = 0; row < this.rows; row++) {
      this.addRow();
    }
  }

  this.add = function (tile) {
    var x = tile.x;
    var y = tile.y;
    var blocks = tile.blocks;
    for (var i = 0, ii = blocks.length; i < ii; i++) {
      var block = blocks[i];
      yValue = y + block.offsetY;
      xValue = x + block.offsetX;

      if (yValue <= 0) {
        GameOver();
        return;
      }
      this.matrix[yValue][xValue] = new Block(0, 0, block.hexColor);
    }

    this.removeFullRows();
  }

  this.draw = function (edgeLength, offsetX, offsetY) {
    for (var rowNumber = 0; rowNumber < this.rows; rowNumber++) {
      var row = this.matrix[rowNumber];
      for (var colNumber = 0; colNumber < this.columns; colNumber++) {        
        var block = row[colNumber];
        if (block instanceof Block) {
          block.draw(colNumber, rowNumber, edgeLength, offsetX, offsetY)
        }
      }
    }
  }

  this.removeFullRows = function () {
    var removedRowCount = 0;
    for (var i = 0; i < this.rows; i++) {
      var row = this.matrix[i];      
      var fullRow = true;
      for (var j = 0; j < this.columns; j++) {
        var element = row[j];
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

  this.addRow = function () {
    var row = [];
    row.length = this.columns;
    this.matrix.unshift(row);    
  }

  this.isOccupied = function(rowNumber, colNumber){    
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

  this.initialize();
}