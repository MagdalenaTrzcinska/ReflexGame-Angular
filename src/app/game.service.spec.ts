import {GameService} from './game.service';

describe('GameService', () => {
  let service: GameService;
  beforeEach(() => {
    service = new GameService();
  });

  it('#gameState.life should have "3" ', () => {
    expect(service.gameState.life).toBe(3);
  });

  it('#gameState.pkt should have "0" ', () => {
    expect(service.gameState.pkt).toBe(0);
  });

  it('#gameState.time should have "60" ', () => {
    expect(service.gameState.time).toBe(60);
  });

  it('#getGameState should be defined', () => {
    service.getGameState().subscribe(value => {
      expect(value).toBeDefined();
    });
  });

  it('#getGameState should be defined2', () => {
    service.gameStart();
    expect(service.isHiddenDescription).toBe(true);
    service.newGame();
    expect(service.isHiddenDescription).toBe(false);
  });

  it('#getGameState should be defined2222', () => {
    service.startTimer();
    expect(service.gameState.time).toBe(60);
  });
});
