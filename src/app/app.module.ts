import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { GameComponent } from './components/game/game.component';
import { TetrisComponent } from './components/tetris/tetris.component';


@NgModule({
  declarations: [
    AppComponent,
    GameInfoComponent,
    GameComponent,
    TetrisComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
