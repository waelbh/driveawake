import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceClientCarsComponent } from './insurance-client-cars.component';

describe('InsuranceClientCarsComponent', () => {
  let component: InsuranceClientCarsComponent;
  let fixture: ComponentFixture<InsuranceClientCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceClientCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceClientCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
