import { TestBed } from '@angular/core/testing';

import { GerichtService } from './gericht.service';

describe('GerichtService', () => {
  let service: GerichtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerichtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
