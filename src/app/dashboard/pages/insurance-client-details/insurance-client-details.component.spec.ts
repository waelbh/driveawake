import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceClientDetailsComponent } from './insurance-client-details.component';

describe('InsuranceClientDetailsComponent', () => {
  let component: InsuranceClientDetailsComponent;
  let fixture: ComponentFixture<InsuranceClientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceClientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
