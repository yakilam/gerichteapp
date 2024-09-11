import { TestBed } from '@angular/core/testing';

import { addGerichtService } from './add-gericht.service';

describe('addGerichtService', () => {
  let service: addGerichtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(addGerichtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
