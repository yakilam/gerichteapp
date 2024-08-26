import { TestBed } from '@angular/core/testing';

import { VorratService } from './vorrat.service';

describe('VorratService', () => {
  let service: VorratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VorratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
