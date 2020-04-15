import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  timeLeft: number = 60;
  i: number = 0;
  interval;
  game;
  gameSpeed;
  timeOfAppearanceOfTheSquare: number = 2300;
  timeTheSquareDisappears: number = 3300;
  life: number = 3;
  pkt: number = 0;
  randomSquares: number;
  last;
  boards: Array<string> = [' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' '];

  selectedSquares: Array<number> = [];
  isHidden: boolean = false;
  isDisabledBtnStart: boolean = false;

  constructor() {
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.orEnd();
      }
    }, 1000);
  }

  gameStart() {
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

  deleteSquare() {
    setTimeout(() => {
      this.boards[this.selectedSquares[this.i]] = ' ';
      this.selectedSquares.splice(this.i, 1);
    }, this.timeTheSquareDisappears);
  }

  onVerification(i) {
    if (this.last !== i && this.selectedSquares.indexOf(i) !== -1) {
      this.pkt++;
    }
    if (this.randomSquares !== i) {
      this.life--;
    }
    this.last = i;
    this.orEnd();
  }

  orEnd() {
    if (this.life === 0 || this.timeLeft === 0) {
      alert('Game Over. You have ' + this.pkt + ' points.');
      this.onResetGame();
    }
  }

  onResetGame() {
    this.isHidden = false;
    this.isDisabledBtnStart = false;
    this.pkt = 0;
    this.life = 3;
    this.selectedSquares = [];
    clearInterval(this.interval);
    clearInterval(this.game);
    clearInterval(this.gameSpeed);
    this.timeLeft = 60;
    this.timeOfAppearanceOfTheSquare = 2300;
    this.timeTheSquareDisappears = 3300;
    this.boards = [' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' '];
  }
}



