import {GameService} from './game.service';

describe('GameService', () => {
  let service: GameService;
  beforeEach(() => {
    service = new GameService();
  });

  it('#gameState.life should have "3" ', () => {
    expect(service.gameState.life).toEqual(3);
  });

  it('#gameState.pkt should have "0" ', () => {
    expect(service.gameState.pkt).toEqual(0);
  });

  it('#gameState.time should have "60" ', () => {
    expect(service.gameState.time).toEqual(60);
  });

  it('#getGameState should be defined', () => {
    service.getGameState().subscribe(value => {
      expect(value).toBeDefined();
    });
  });


});
