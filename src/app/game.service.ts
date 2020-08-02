import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  isHiddenDescription: boolean;
  isDisabledBtnStart: boolean;
  randomSquare: number;
  lastClickedSquares: number;
  boardsOfSquares: Array<string>;
  shownSquares: Array<number>;
  gameState: Game = {
      pkt: 0,
      life: 3,
      time: 60
    };
  interval;
  game;
  gameSpeed;

  private readonly subject: BehaviorSubject<Game>;

  constructor() {
    this.subject = new BehaviorSubject<Game>(this.gameState);
  }

  getGameState(): Observable<Game> {
    return this.subject;
  }

  gameStart() {
    let timeOfAppearanceOfTheSquare = 2300;
    let timeTheSquareDisappears = 3300;
    this.newGame();
    this.startTimer();
    this.isHiddenDescription = true;
    this.isDisabledBtnStart = true;

    this.game = setInterval(() => {
      this.randomSquare = Math.floor(Math.random() * 36);
      this.boardsOfSquares[this.randomSquare] = 'O';
      this.shownSquares.push(this.randomSquare);
      this.deletingASquareFromTheBoard(timeTheSquareDisappears);
    }, timeOfAppearanceOfTheSquare);

    this.gameSpeed = setInterval(() => {
      timeOfAppearanceOfTheSquare -= 300;
      timeTheSquareDisappears -= 350;
    }, 6000);
  }

  newGame() {
    this.isHiddenDescription = false;
    this.isDisabledBtnStart = false;
    this.gameState = {
      pkt: 0,
      life: 3,
      time: 60
    };
    this.shownSquares = [];
    this.boardsOfSquares = [' ', ' ', ' ', ' ', ' ', ' ',
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

  deletingASquareFromTheBoard(timeTheSquareDisappears: number) {
    setTimeout(() => {
      this.boardsOfSquares[this.shownSquares[0]] = ' ';
      this.shownSquares.splice(0, 1);
    }, timeTheSquareDisappears);
  }

  onMovementVerification(whichSquare: number) {
    if (this.lastClickedSquares !== whichSquare && this.shownSquares.indexOf(whichSquare) !== -1) {
      this.pointAdded();
    }
    if (this.randomSquare !== whichSquare) {
      this.deductionOfLife();
    }
    this.lastClickedSquares = whichSquare;
    this.checkIfEnd();
  }

  pointAdded() {
    this.gameState.pkt++;
  }

  deductionOfLife() {
    this.gameState.life--;
  }

  checkIfEnd() {
    if (this.gameState.life === 0 || this.gameState.time === 0) {
      alert('Game Over. You have ' + this.gameState.pkt + ' points.');
      this.onResetGame();
    }
  }

  onResetGame() {
    clearInterval(this.interval);
    clearInterval(this.game);
    clearInterval(this.gameSpeed);
    this.newGame();
  }
}
