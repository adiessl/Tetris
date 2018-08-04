function ShapeGenerator() {
  this.shapes = [
    {
      name: 'L',
      color: '#FFFF00',
      offsets: [[0, 0], [1, 0], [0, -1], [0, -2]]
    }, {
      name: 'J',
      color: '#00FF00',
      offsets: [[-1, 0], [0, 0], [0, -1], [0, -2]]
    }, {
      name: 'S',
      color: '#0000FF',
      offsets: [[-1, 0], [0, 0], [0, -1], [1, -1]]
    }, {
      name: 'Z',
      color: '#00FFFF',
      offsets: [[-1, -1], [0, -1], [0, 0], [1, 0]]
    }, {
      name: 'I',
      color: '#FF00FF',
      offsets: [[0, 0], [0, -1], [0, -2], [0, -3]]
    }, {
      name: 'T',
      color: '#FF8800',
      offsets: [[-1, 0], [0, 0], [1, 0], [0, -1]]
    }, {
      name: 'O',
      color: '#CECECE',
      offsets: [[0, 0], [1, 0], [0, -1], [1, -1]]
    }, {
      name: 'o',
      color: '#FF0000',
      offsets: [[0, 0]]
    }
  ];

  this.getShape = function () {
    var index;
    var baseValue = this.shapes.length - 1;
    if (Math.random() > 0.99) {
      index = baseValue;
    } else {
      index = Math.floor((Math.random() * baseValue));
    }
    
    var shape = this.shapes[index];
    var color = shape.color;
    var blocks = [];
    shape.offsets.forEach(function (offset) {
      var block = new Block(offset[0], offset[1], color);
      blocks.push(block);
    }, this);
    return blocks;
  }
}
