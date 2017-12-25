interface Position {
  x: number;
  y: number;
}

class Player {
  pos: Position;
  matrix: Array<any>;
  next: Array<any>;
  fieldWidth: number;
  fieldHeight: number;
  matrixHeight: number;
  matrixWidth: number;
  startPosition: Position;
  matrixMap: Object;

  constructor(fieldWidth, fieldHeight) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.pos = { x: fieldWidth / 2, y: 0 };
    this.matrixHeight = 3;
    this.matrixWidth = 3;
    this.startPosition = { x: fieldWidth / 2, y: 0 };
    this.matrixMap = {
      A: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      B: [
        [1, 1],
        [1, 1]
      ],
      C: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      D: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ],
      E: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      F: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      G: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ]
    }
    this.generateMatrix()
  }

  public matrixRotate(dir) {
    for (let y = 0; y < this.matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          this.matrix[x][y],
          this.matrix[y][x]

        ] = [
            this.matrix[y][x],
            this.matrix[x][y]
          ];
      }
    }
    if (dir > 0) {
      this.matrix.forEach(row => { row.reverse() })
    } else {
      this.matrix.reverse();
    }
  }

  generateMatrix() {
    const figure = 'ABCDEFG'
    const code = figure[figure.length * Math.random() | 0];
    this.matrix = this.matrixMap[code];
  }

  toTop(value?: number) {
    this.pos = { x: this.fieldWidth / 2, y: 0 };
  }

  moveLeft(value?: number) {
    this.pos.x -= value ? value : 1;
  }

  moveRight(value?: number) {
    this.pos.x += value ? value : 1;
  }

  moveUp() {
    this.pos.y -= 1;
  }

  moveDown() {
    this.pos.y += 1;
  }
}

export { Player }