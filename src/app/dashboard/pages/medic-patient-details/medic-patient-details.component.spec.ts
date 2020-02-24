import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPatientDetailsComponent } from './medic-patient-details.component';

describe('MedicPatientDetailsComponent', () => {
  let component: MedicPatientDetailsComponent;
  let fixture: ComponentFixture<MedicPatientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicPatientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
