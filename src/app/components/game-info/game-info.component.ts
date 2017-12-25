import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { gameReducer } from '../state/reducer';
import { Game } from '../state/game.model';
import * as GameActions from '../state/actions';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})


export class GameInfoComponent implements OnInit {
  public foo: string;
  public level: Observable<any>;
  public score: Observable<any>;
  public buttonText: string;
  pause: boolean;
  constructor(private store: Store<any>) {
    this.buttonText = 'Start Game'
  }

  public pauseGame() {
    if (!this.pause) {
      this.buttonText = 'Start Game'
      this.store.dispatch(new GameActions.PauseGame({ pause: true }));
      return;
    }
    if (this.pause) {
      this.buttonText = 'Pause Game'
      this.store.dispatch(new GameActions.RestoreGame({ pause: false }));
    }
  }
  ngOnInit() {
    this.store.select((state => state))
      .subscribe((data) => {
        this.level = data.gameReducer.level;
        this.score = data.gameReducer.score;
        this.pause = data.gameReducer.pause;
      });
    this.store.dispatch(new GameActions.StartGame({ started: true }));
  }
}


