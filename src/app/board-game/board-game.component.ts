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
  }

  ngDoCheck(): void {
    this.boards = this.service.boardsOfSquares;
    this.isHiddenDescription = this.service.isHiddenDescription;
    this.isDisabledBtnStart = this.service.isDisabledBtnStart;
  }

  onStartGame() {
    return this.service.gameStart();
  }

  onTrafficVerification(whichSquare: number) {
    return this.service.onMovementVerification(whichSquare);
  }

  onResetGame() {
    return this.service.onResetGame();
  }
}
