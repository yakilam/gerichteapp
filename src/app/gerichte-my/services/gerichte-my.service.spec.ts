import { TestBed } from '@angular/core/testing';

import { GerichteMyService } from './gerichte-my.service';

describe('GerichteMyService', () => {
  let service: GerichteMyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerichteMyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
