import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartmonthlyComponent } from './chartmonthly.component';

describe('ChartmonthlyComponent', () => {
  let component: ChartmonthlyComponent;
  let fixture: ComponentFixture<ChartmonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartmonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartmonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
