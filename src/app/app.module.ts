import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { GameComponent } from './components/game/game.component';
import { TetrisComponent } from './components/tetris/tetris.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { EffectsModule } from '@ngrx/effects';
import { gameReducer } from './components/state/reducer';

import { TetrisService } from './services/tetris.service';

@NgModule({
  declarations: [
    AppComponent,
    GameInfoComponent,
    GameComponent,
    TetrisComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({gameReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [
    TetrisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
