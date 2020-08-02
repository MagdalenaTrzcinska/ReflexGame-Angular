import { TestBed, async } from '@angular/core/testing';
import {LivePktTimeComponent} from './live-pkt-time.component';
import {GameService} from '../game.service';

describe('LivePktTimeComponent', () => {
  let service: GameService;
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

  it('#gameState should has values', () => {
    const comp = TestBed.inject(LivePktTimeComponent);
    comp.ngOnInit();
    expect(comp.gameState).toBeDefined();
  });

  it('should render true values', () => {
    const comp = TestBed.createComponent(LivePktTimeComponent);
    comp.detectChanges();
    const compiled = comp.debugElement.nativeElement;
    expect(compiled.querySelector('.life').textContent).toContain('Life: 3');
    expect(compiled.querySelector('.pkt').textContent).toContain('Pkt: 0');
    expect(compiled.querySelector('.time').textContent).toContain('Time: 60');
  });

  it('#gameState.pkt should has 1 when the movement is correct ', () => {
    service = new GameService();
    service.pointAdded();
    expect(service.gameState.pkt).toBe(1);
  });

  it('#gameState.life should has 2 when the movement is incorrect', () => {
    service = new GameService();
    service.deductionOfLife();
    expect(service.gameState.life).toBe(2);
  });
});
