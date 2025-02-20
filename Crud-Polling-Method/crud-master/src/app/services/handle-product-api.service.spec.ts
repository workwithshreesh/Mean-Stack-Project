import { TestBed } from '@angular/core/testing';

import { HandleProductApiService } from './handle-product-api.service';

describe('HandleProductApiService', () => {
  let service: HandleProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
