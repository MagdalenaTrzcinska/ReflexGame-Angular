import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  interval: number;
  game: number;
  gameSpeed: number;
  randomSquare: number;
  lastClickedSquares: number;
  boards: Array<string>;
  selectedSquares: Array<number>;
  isHiddenDescription: boolean;
  isDisabledBtnStart: boolean;
  timeOfAppearanceOfTheSquare: number;
  timeTheSquareDisappears: number;

  private readonly subject: BehaviorSubject<Game>;

   gameState: Game =
    {
      life: 3,
      pkt: 0,
      time: 60,
    };

  constructor() {
    this.subject = new BehaviorSubject<Game>(this.gameState);
  }

  getGameState(): Observable<Game>{
    return this.subject;
  }

  gameStart() {
    this.newGame();
    this.startTimer();
    this.isHiddenDescription = true;
    this.isDisabledBtnStart = true;
    this.game = setInterval(() => {
      this.randomSquare = Math.floor(Math.random() * 36);
      this.boards[this.randomSquare] = 'O';
      this.selectedSquares.push(this.randomSquare);
      this.deleteSquare();
    }, this.timeOfAppearanceOfTheSquare);

    this.gameSpeed = setInterval(() => {
      this.timeOfAppearanceOfTheSquare -= 300;
      this.timeTheSquareDisappears -= 350;
    }, 6000);
  }

  newGame() {
    this.isHiddenDescription = false;
    this.isDisabledBtnStart = false;
    this.gameState.pkt = 0;
    this.gameState.life = 3;
    this.selectedSquares = [];
    this.gameState.time = 60;
    this.timeOfAppearanceOfTheSquare = 2300;
    this.timeTheSquareDisappears = 3300;
    this.boards = [' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' '];
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.gameState.time > 0) {
        this.gameState.time--;
      } else {
        this.checkIfEnd();
      }
    }, 1000);
  }

  deleteSquare() {
    setTimeout(() => {
      this.boards[this.selectedSquares[0]] = ' ';
      this.selectedSquares.splice(0, 1);
    }, this.timeTheSquareDisappears);
  }

  onTrafficVerification(whichSquare: number) {
    if (this.lastClickedSquares !== whichSquare && this.selectedSquares.indexOf(whichSquare) !== -1) {
      this.gameState.pkt++;
    }
    if (this.randomSquare !== whichSquare) {
      this.gameState.life--;
    }
    this.lastClickedSquares = whichSquare;
    this.checkIfEnd();
  }

  checkIfEnd() {
    if (this.gameState.life === 0 || this.gameState.time === 0) {
      alert('Game Over. You have ' + this.gameState.pkt + ' points.');
      this.onResetGame();
    }
  }

  onResetGame() {
    this.newGame();
    clearInterval(this.interval);
    clearInterval(this.game);
    clearInterval(this.gameSpeed);
  }
}



