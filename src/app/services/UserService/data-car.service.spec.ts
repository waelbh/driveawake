import { TestBed } from '@angular/core/testing';

import { DataCarService } from './data-car.service';

describe('DataCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCarService = TestBed.get(DataCarService);
    expect(service).toBeTruthy();
  });
});
