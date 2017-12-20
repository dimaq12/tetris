import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

interface AppState{
  message: 'string';
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  message$: Observable<string>

  constructor(private store: Store <AppState>) { 
    this.message$ = this.store.select('message');
  }

  spanishMessage(){
    this.store.dispatch({type: "SPANISH"})
  }

  frenchMessage(){
    this.store.dispatch({type: "FRENCH"})
  }

  ngOnInit() {
  }

}
