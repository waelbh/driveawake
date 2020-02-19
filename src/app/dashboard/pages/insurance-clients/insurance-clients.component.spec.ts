import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceClientsComponent } from './insurance-clients.component';

describe('InsuranceClientsComponent', () => {
  let component: InsuranceClientsComponent;
  let fixture: ComponentFixture<InsuranceClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
