import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Field } from '../components/classes/field';
import { Player } from '../components/classes/player';
import * as GameActions from '../components/state/actions';


@Injectable()
export class TetrisService {
  lastTime: number;
  dropCounter: number;
  dropInterval: number;
  player: Player;
  field: Field;
  game$: Observable<any>;
  game: string;
  started: boolean;
  pause: boolean;
  animation: any;
  canvasEl: HTMLCanvasElement;
  private cx: CanvasRenderingContext2D;

  constructor(private store: Store<any>) {
    this.field = new Field(20, 30)
    this.player = new Player(this.field.fieldX, this.field.fieldY)
    this.dropCounter = 0;
    this.dropInterval = 1000;
  }

  init() {
    this.game$ = this.store.select('game');
    this.store.select((state => state))
      .subscribe((data) => {
        this.started = data.gameReducer.started;
        this.pause = data.gameReducer.pause;
        this.pauseGame()
        this.restoreGame()
      });
  }

  afterInit(canvasEl, cx) {
    this.canvasEl = canvasEl;
    this.cx = this.canvasEl.getContext('2d');
    this.cx = cx;
    this.cx.scale(20, 20);
    this.update();
  }

  pauseGame() {
    if (this.pause) {
      window.cancelAnimationFrame(this.animation)
    }
  }

  restoreGame() {
    if (!this.pause) {
      window.cancelAnimationFrame(this.animation)
      this.animation = window.requestAnimationFrame(this.update.bind(this))
    }
  }

  public merge(field, player) {
    this.player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          field[y + player.pos.y][x + player.pos.x] = value;
        }
      })
    });
  }

  public collide(field, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
          (field[y + o.y] &&
            field[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  public colideHandler() {
    this.player.moveUp();
    this.store.dispatch(new GameActions.UpdateCounter({ score: 100 }));
    this.merge(this.field.field, this.player);
    this.field.fieldSweep()
    this.player.generateMatrix()
    this.player.toTop();
    if (this.collide(this.field.field, this.player)) {
      console.log('game over')
      this.field.clearField();
    }
  }

  public playerRotate() {
    const pos = this.player.pos.x;
    let offset = 1;
    this.player.matrixRotate(1);
    while (this.collide(this.field.field, this.player)) {
      this.player.moveRight(offset);
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.player.matrix[0].length) {
        this.player.matrixRotate(-1);
        this.player.pos.x = pos;
        return
      }
    }
  }

  public playerDrop() {
    this.player.moveDown();
    if (this.collide(this.field.field, this.player)) {
      this.colideHandler()
    }
    this.dropCounter = 0;
  }

  public drow() {
    this.cx.fillStyle = "#000";
    this.cx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.drowMatrix(this.player.matrix, this.player.pos);
    this.drowMatrix(this.field.field, { x: 0, y: 0 });
  }

  public update(time: number = 0) {
    this.drow()
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime | 0;
    if (this.dropCounter >= this.dropInterval) {
      this.player.pos.y = this.player.pos.y + 1;
      this.dropCounter = 0;
      if (this.collide(this.field.field, this.player)) {
        this.colideHandler();
      }
    }
    if (!this.pause) {
      this.animation = window.requestAnimationFrame(this.update.bind(this))
    }
  }

  public drowMatrix(matrix: Array<any>, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.cx.fillStyle = "red";
          this.cx.fillRect(x + offset.x, y + offset.y, 1, 1)
        }
      })
    });
  }

}
