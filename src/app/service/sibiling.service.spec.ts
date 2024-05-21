import { TestBed } from '@angular/core/testing';

import { SibilingService } from './sibiling.service';

describe('SibilingService', () => {
  let service: SibilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SibilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
