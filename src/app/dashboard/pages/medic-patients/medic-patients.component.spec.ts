import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPatientsComponent } from './medic-patients.component';

describe('MedicPatientsComponent', () => {
  let component: MedicPatientsComponent;
  let fixture: ComponentFixture<MedicPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
