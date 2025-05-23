import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authMatchGuard } from './auth-match.guard';

describe('authMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
