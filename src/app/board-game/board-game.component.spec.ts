import { TestBed, async } from '@angular/core/testing';
import {GameService} from '../game.service';
import {BoardGameComponent} from './board-game.component';

describe('BoardGameComponent', () => {
  let service: GameService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BoardGameComponent, {provide: GameService}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BoardGameComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('#onStartGame should return #service.gameStart', () => {
    service = new GameService();
    const comp = TestBed.inject(BoardGameComponent);
    expect(comp.onStartGame()).toBe(service.gameStart());
  });

  it('#onResetGame should return #service.onResetGame', () => {
    service = new GameService();
    const comp = TestBed.inject(BoardGameComponent);
    expect(comp.onResetGame()).toBe(service.onResetGame());
  });
});
