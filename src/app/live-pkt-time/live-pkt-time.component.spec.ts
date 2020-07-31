import { TestBed, async } from '@angular/core/testing';
import {LivePktTimeComponent} from './live-pkt-time.component';
import {GameService} from '../game.service';

describe('LivePktTimeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LivePktTimeComponent, {provide: GameService}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LivePktTimeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app2', () => {
    const comp = TestBed.inject(LivePktTimeComponent);
    const userService = TestBed.inject(GameService);
    expect(comp.gameState).toBeUndefined();
  });
});
