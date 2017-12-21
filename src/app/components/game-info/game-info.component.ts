import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { gameReducer } from '../state/reducer';
import { Game } from '../state/game.model';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})


export class GameInfoComponent implements OnInit {
  public game$: Observable<any>;
  constructor(private store: Store<any>) { 

  }

  public startGame(){
    console.log(this.store)
    this.game$ = this.store.select('game');
  }

  ngOnInit() {
    this.game$ = this.store.select('game');
  }
}


