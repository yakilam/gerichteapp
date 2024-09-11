import { TestBed } from '@angular/core/testing';

import { MyPlanService } from './my-plan.service';

describe('MyPlanService', () => {
  let service: MyPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
