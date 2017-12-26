import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, HostListener, OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Game } from '../state/game.model';
import { Field } from '../classes/field';
import { Player } from '../classes/player';
import { TetrisService } from '../../services/tetris.service';

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
  canvasEl: HTMLCanvasElement;
  constructor(private store: Store<any>, private tetrisService: TetrisService) {
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.tetrisService.player.moveRight()
      if (this.tetrisService.collide(this.tetrisService.field.field, this.tetrisService.player)) {
        this.tetrisService.player.moveLeft();
      }

    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.tetrisService.player.moveLeft();
      if (this.tetrisService.collide(this.tetrisService.field.field, this.tetrisService.player)) {
        this.tetrisService.player.moveRight();
      }
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.tetrisService.playerRotate()
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.tetrisService.playerDrop()
    }
  }

  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');
    this.tetrisService.afterInit(this.canvasEl, this.cx);
  }

  ngOnInit() {
    this.tetrisService.init();
  }
}