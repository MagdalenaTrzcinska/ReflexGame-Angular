import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  firstSquareInTheArray = 0;
  interval: number;
  game: number;
  gameSpeed: number;
  randomSquares: number;
  lastSquares: number;

  boards: Array<string>;
  selectedSquares: Array<number>;
  isHidden: boolean;
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
    this.isHidden = true;
    this.isDisabledBtnStart = true;
    this.game = setInterval(() => {
      this.randomSquares = Math.floor(Math.random() * 36);
      this.boards[this.randomSquares] = 'O';
      this.selectedSquares.push(this.randomSquares);
      this.deleteSquare();
    }, this.timeOfAppearanceOfTheSquare);

    this.gameSpeed = setInterval(() => {
      this.timeOfAppearanceOfTheSquare -= 300;
      this.timeTheSquareDisappears -= 350;
    }, 6000);
  }

  newGame() {
    this.isHidden = false;
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
      this.boards[this.selectedSquares[this.firstSquareInTheArray]] = ' ';
      this.selectedSquares.splice(this.firstSquareInTheArray, 1);
    }, this.timeTheSquareDisappears);
  }

  onVerification(whichSquare) {
    if (this.lastSquares !== whichSquare && this.selectedSquares.indexOf(whichSquare) !== -1) {
      this.gameState.pkt++;
    }
    if (this.randomSquares !== whichSquare) {
      this.gameState.life--;
    }
    this.lastSquares = whichSquare;
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



