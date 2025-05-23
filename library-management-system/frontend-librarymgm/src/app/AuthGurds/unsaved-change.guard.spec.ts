import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { unsavedChangeGuard } from './unsaved-change.guard';

describe('unsavedChangeGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unsavedChangeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
