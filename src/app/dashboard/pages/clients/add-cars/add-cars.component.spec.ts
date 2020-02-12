import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarsComponent } from './add-cars.component';

describe('AddCarsComponent', () => {
  let component: AddCarsComponent;
  let fixture: ComponentFixture<AddCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
