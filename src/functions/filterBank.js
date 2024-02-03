class Kernel {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.centerX = Math.floor(width / 2);
    this.centerY = Math.floor(height / 2);
    this.weightArray = [];
    for (var h = 0; h < height; ++h) {
      this.weightArray.push([]);
      for (var w = 0; w < width; ++w) {
        this.weightArray[h].push(0);
      }
    }
  }
}


export var VerticalFilter = new Kernel(3, 3);
VerticalFilter.weightArray[0] = [8, 0, -8];
VerticalFilter.weightArray[1] = [8, 0, -8];
VerticalFilter.weightArray[2] = [8, 0, -8];


export var LineFilter = new Kernel(3, 3);
LineFilter.weightArray[0] = [-2, -1, 0];
LineFilter.weightArray[1] = [-1, 1, 1];
LineFilter.weightArray[2] = [0, 1, 2];


export var DiagonalFilter = new Kernel(3, 3);
DiagonalFilter.weightArray[0] = [8, 0, -4];
DiagonalFilter.weightArray[1] = [0, 8, 0];
DiagonalFilter.weightArray[2] = [-4, 0, 8];


export var CircularFilter = new Kernel(3, 3);
CircularFilter.weightArray[0] = [-1, -1, -1];
CircularFilter.weightArray[1] = [-1, 8, -1];
CircularFilter.weightArray[2] = [-1, -1, -1];