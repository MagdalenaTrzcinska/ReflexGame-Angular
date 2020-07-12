import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Game} from '../game';


@Component({
  selector: 'app-live-pkt-time',
  templateUrl: './live-pkt-time.component.html',
  styleUrls: ['./live-pkt-time.component.scss']
})
export class LivePktTimeComponent implements OnInit{
  gameState: Game;

  constructor(private service: GameService) {
  }

  ngOnInit() {
    this.service.getGameState().subscribe(game => {
      this.gameState = game;
    });
  }
}
