import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProfileComponent } from './insurance-profile.component';

describe('InsuranceProfileComponent', () => {
  let component: InsuranceProfileComponent;
  let fixture: ComponentFixture<InsuranceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
