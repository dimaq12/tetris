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
  public foo: string;
  public level: Observable<any>;
  constructor(private store: Store<any>) { 
  }

  public startGame(){
    
  }

  ngOnInit() {
    this.store.select((state => state))
      .subscribe( (data )=> {
        this.level = data.gameReducer.level;
        console.log(data.gameReducer)
      });
  }
}


