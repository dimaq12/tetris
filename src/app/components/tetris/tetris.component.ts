import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, HostListener, OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
  
import * as GameActions from '../state/actions';
import { Game } from '../state/game.model';
import { Field } from '../classes/field';
import { Player } from '../classes/player';

enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40
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
  field: Field;
  game$: Observable<any>;
  game: string;

  constructor(private store: Store<any>){
   this.field = new Field()
   this.player = new Player(this.field.fieldX, this.field.fieldY)
   this.dropCounter = 0;
   this.dropInterval = 1000;
  }
  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.player.moveRight()
        if (this.collide(this.field.field, this.player)){
          this.player.moveLeft();
        }
        
      }
  
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.player.moveLeft();
        if (this.collide(this.field.field, this.player)){
          this.player.moveRight();
        }
      }

      if (event.keyCode ===  KEY_CODE.UP_ARROW) {
        this.player.matrixRotate(1);
        const game =  {
          id: '1',
          done: false,
          field: this.field,
          score: 0,
          level: 8,
          pause: false
        }
        this.store.dispatch(new GameActions.StartGame({ game }));
        console.log(this.game$)
      }
  
      if (event.keyCode ===  KEY_CODE.DOWN_ARROW) {
        this.playerDrop()
      }
    }

  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;  
  
  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.cx.scale( 20, 20 )
    this.update();
  }

  ngOnInit(){
    this.game$ = this.store.select('game');
    const game =  {
      id: '1',
      done: false,
      field: this.field,
      score: 0,
      level: 0,
      pause: false
    }
    this.store.dispatch(new GameActions.StartGame({ game }));
  } 

  public merge(field, player){
    this.player.matrix.forEach((row, y) => {
      row.forEach((value, x) =>{
        if(value !== 0){
          field[y + player.pos.y][x + player.pos.x] = value;
        }
      })
    });
  }

  public collide(field, player){
    const [m, o] = [player.matrix,  player.pos];
    for(let y = 0; y < m.length; ++y){
      for(let x = 0; x < m[y].length; ++x){
        if(m[y][x] !== 0 && 
          (field[y + o.y] &&
             field[y + o.y][x + o.x]) !== 0){
          return true;
        }
      }
    }
    return false;
  }

  public colideHandler(){
    this.player.moveUp();
    this.merge(this.field.field, this.player);
    this.player.toTop();
  }

  public playerDrop(){
    this.player.moveDown();
    if(this.collide(this.field.field, this.player)){
      this.colideHandler()
    }
    this.dropCounter = 0;
  }

  public drow(){
    this.cx.fillStyle = "#000";
    this.cx.fillRect( 0, 0, this.canvasEl.width, this.canvasEl.height );
    this.drowMatrix(this.player.matrix, this.player.pos);
    this.drowMatrix(this.field.field, {x: 0, y: 0});
  }

  public update(time: number = 0){
    this.drow()
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += 16;
    if(this.dropCounter >= this.dropInterval){
      this.player.pos.y = this.player.pos.y + 1;
      this.dropCounter = 0;
      if(this.collide(this.field.field, this.player)){
        this.colideHandler()
      }
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