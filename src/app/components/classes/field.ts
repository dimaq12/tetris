class Field{
    field: Array<any>;
    fieldX: number;
    fieldY: number;
    constructor(){
      this.fieldX = 24;
      this.fieldY = 40;
      this.field = this.createMatrix(this.fieldX, this.fieldY);
    }
  
    public createMatrix(w, h){
      let matrix = [];
      while(h--){
        matrix.push(new Array(w).fill(0))
      }
      return matrix;
    }
  }

  export { Field }