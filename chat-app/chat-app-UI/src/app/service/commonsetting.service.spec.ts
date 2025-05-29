import { TestBed } from '@angular/core/testing';

import { CommonsettingService } from './commonsetting.service';

describe('CommonsettingService', () => {
  let service: CommonsettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonsettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
