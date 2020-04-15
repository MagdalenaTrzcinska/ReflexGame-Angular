import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivePktTimeComponent } from './live-pkt-time/live-pkt-time.component';
import { BoardGameComponent } from './board-game/board-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LivePktTimeComponent,
    BoardGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
