import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { gameReducer } from '../state/reducer';
import { Game } from '../state/game.model';
import * as GameActions from '../state/actions';


const game =  {
  id: '1',
  started: true,
  field: this.field,
  score: 0,
  level: 1,
  pause: false
}

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})


export class GameInfoComponent implements OnInit {
  public foo: string;
  public level: Observable<any>;
  public score: Observable<any>;
  constructor(private store: Store<any>) { 
  }

  public startGame(){
    this.store.dispatch(new GameActions.StartGame({ game }));
  }


  ngOnInit() {
    this.store.select((state => state))
      .subscribe( (data )=> {
        this.level = data.gameReducer.level;
        this.level = data.gameReducer.score;
      });
  }
}


