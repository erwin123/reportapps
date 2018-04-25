import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartgaugeComponent } from './chartgauge.component';

describe('ChartgaugeComponent', () => {
  let component: ChartgaugeComponent;
  let fixture: ComponentFixture<ChartgaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartgaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartgaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
