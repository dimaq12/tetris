import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from '../state/game.model';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private store: Store<any>) {
  }
  ngOnInit() {

  }

}



