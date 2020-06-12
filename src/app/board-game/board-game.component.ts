import {Component, DoCheck} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements DoCheck {
  isDisabledBtnStart: boolean;
  isHidden: boolean;
  boards: Array<string>;

  constructor(private service: GameService) {
    this.boards = this.service.boards;
  }
  ngDoCheck(): void {
    this.boards = this.service.boards;
    this.isHidden = this.service.isHidden;
    this.isDisabledBtnStart = this.service.isDisabledBtnStart;
  }

  onStartGame() {
    this.service.gameStart();
  }

  onVerification(whichSquare) {
    this.service.onVerification(whichSquare);
  }

  onResetGame() {
    this.service.onResetGame();
  }
}
