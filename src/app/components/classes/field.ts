class Field {
  field: Array<any>;
  constructor(public fieldX: number, public fieldY: number) {
    this.field = this.createMatrix(this.fieldX, this.fieldY);
  }

  public createMatrix(w, h) {
    let matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0))
    }
    return matrix;
  }

  public fieldSweep() {
    outer:
    for (let y = this.field.length - 1; y > 0; --y) {
      for (let x = 0; x < this.field[y].length; ++x) {
        if (this.field[y][x] === 0) {
          continue outer;
        }
      }
      const row = this.field.splice(y, 1)[0].fill(0);
      this.field.unshift(row);
      ++y;
    }
  }

  public clearField() {
    this.field.forEach(row => row.fill(0));
  }
}

export { Field }