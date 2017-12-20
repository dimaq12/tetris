
import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, HostListener
} from '@angular/core';

interface Position {
  x: number;
  y: number;
}
enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40
} 


class Player{
  pos : Position;
  matrix : Array<any>

  constructor(){
  this.pos = {x : 0, y: 0}
  this.matrix = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
  }
  moveLeft(){
    this.pos.x += 1;
  }
  moveRight(){
    this.pos.x -= 1;
  }
  moveUp(){
    this.pos.y -= 1;
  }
  moveDown(){
    this.pos.y += 1;
  }
}

@Component({
  selector: 'tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements AfterViewInit {
  // a reference to the canvas element from our template
  lastTime: number;
  dropCounter: number;
  dropInterval: number;
  player: Player;
  canvasEl: HTMLCanvasElement;
  arena: Array<any>;

  constructor(){
   this.player = new Player()
   this.dropCounter = 0;
   this.dropInterval = 1000;
   this.arena = this.createMatrix(24, 40);
  }
  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.player.moveRight()
      }
  
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.player.moveLeft();
      }

      if (event.keyCode ===  KEY_CODE.UP_ARROW) {
        
      }
  
      if (event.keyCode ===  KEY_CODE.DOWN_ARROW) {
        this.playerDrop()
      }
    }

  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;  
  
  public ngAfterViewInit() {
    // get the context
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.cx.scale( 20, 20 )
    this.update();
  }

  public merge(arena, player){
    this.player.matrix.forEach((row, y) => {
      row.forEach((value, x) =>{
        if(value !== 0){
          arena[y + player.pos.y][x+ player.pos.y] = value;
        }
      })
    });
  }

  public collide(arena, player){
    const [m, o] = [player.matrix,  player.pos];
    for(let y; y < m.length; ++y){
      for(let x; x < m[y].length; ++x){
        if(m[x][y] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0){
          return true;
        }
      }
    }
    return false;
  }

  public createMatrix(w, h){
    let matrix = [];
    while(h--){
      matrix.push(new Array(w).fill(0))
    }
    return matrix;
  }


  public playerDrop(){
    this.player.moveDown();
    if(this.collide(this.arena, this.player)){
      this.player.moveUp();
      this.merge(this.arena, this.player)
      this.player.pos.y = 0;
    }
    this.dropCounter = 0;
  }

  public drow(){
    this.cx.fillStyle = "#000";
    this.cx.fillRect( 0, 0, this.canvasEl.width, this.canvasEl.height );
    this.drowMatrix(this.player.matrix, this.player.pos);
    this.drowMatrix(this.arena, {x: 0, y: 0});
  }

  public update(time: number = 0){
    this.drow()
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += 16;
    //console.log(this.dropCounter , this.dropInterval, deltaTime)
    if(this.dropCounter >= this.dropInterval){
      
      this.player.pos.y = this.player.pos.y + 1;
      this.dropCounter = 0;
    }
    
    window.requestAnimationFrame(this.update.bind(this))
  }

  public drowMatrix(matrix:Array<any>, offset){
    matrix.forEach((row,  y) => {
      row.forEach((value, x) => {
        if(value !== 0){
          this.cx.fillStyle = "red";
          this.cx.fillRect(x + offset.x, y + offset.y, 1, 1)
        }
      })
    });
  }
}