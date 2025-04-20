import { TestBed } from '@angular/core/testing';

import { HandleCategoryApiService } from './handle-category-api.service';

describe('HandleCategoryApiService', () => {
  let service: HandleCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
