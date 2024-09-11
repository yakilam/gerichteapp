import { TestBed } from '@angular/core/testing';

import { GerichteListService } from './gerichte-list.service';

describe('GerichteListService', () => {
  let service: GerichteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerichteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
