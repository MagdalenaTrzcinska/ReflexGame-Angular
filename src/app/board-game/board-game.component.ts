import {Component, DoCheck, OnInit} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit, DoCheck {
  isDisabledBtnStart: boolean;
  isHidden: boolean;
  boards: Array<any>;

  constructor(private service: GameService) {
  }

  ngOnInit(): void {
    this.boards = this.service.boards;
  }

  ngDoCheck(): void {
    this.boards = this.service.boards;
    this.isHidden = this.service.isHidden;
    this.isDisabledBtnStart = this.service.isDisabledBtnStart;
  }

  onStartGame() {
    return this.service.startTimer(), this.service.gameStart();
  }

  onVerification(i) {
    return this.service.onVerification(i);
  }

  onResetGame() {
    return this.service.onResetGame();
  }

}
