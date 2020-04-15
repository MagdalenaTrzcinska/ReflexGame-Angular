import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePktTimeComponent } from './live-pkt-time.component';

describe('LivePktTimeComponent', () => {
  let component: LivePktTimeComponent;
  let fixture: ComponentFixture<LivePktTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePktTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePktTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
