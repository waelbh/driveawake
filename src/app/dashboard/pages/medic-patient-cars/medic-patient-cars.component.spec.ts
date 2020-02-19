import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPatientCarsComponent } from './medic-patient-cars.component';

describe('MedicPatientCarsComponent', () => {
  let component: MedicPatientCarsComponent;
  let fixture: ComponentFixture<MedicPatientCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicPatientCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPatientCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
