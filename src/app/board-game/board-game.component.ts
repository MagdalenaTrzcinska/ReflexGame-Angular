import {Component, DoCheck} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements DoCheck {
  isDisabledBtnStart: boolean;
  isHiddenDescription: boolean;
  boards: Array<string>;

  constructor(private service: GameService) {
    this.boards = this.service.boards;
  }
  ngDoCheck(): void {
    this.boards = this.service.boards;
    this.isHiddenDescription = this.service.isHiddenDescription;
    this.isDisabledBtnStart = this.service.isDisabledBtnStart;
  }

  onStartGame() {
    this.service.gameStart();
  }

  onTrafficVerification(whichSquare: number) {
    this.service.onTrafficVerification(whichSquare);
  }

  onResetGame() {
    this.service.onResetGame();
  }
}
