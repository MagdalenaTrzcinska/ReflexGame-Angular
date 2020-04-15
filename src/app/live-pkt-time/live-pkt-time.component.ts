import {Component, DoCheck, OnInit} from '@angular/core';
import {GameService} from '../game.service';


@Component({
  selector: 'app-live-pkt-time',
  templateUrl: './live-pkt-time.component.html',
  styleUrls: ['./live-pkt-time.component.scss']
})
export class LivePktTimeComponent implements OnInit, DoCheck {
  life: number = 3;
  pkt: number = 0;

  time: number;


  constructor(private service: GameService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.time = this.service.timeLeft;
    this.life = this.service.life;
    this.pkt = this.service.pkt;
  }


}
