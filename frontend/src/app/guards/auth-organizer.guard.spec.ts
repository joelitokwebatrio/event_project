import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {authOrganizerGuard} from './auth-organizer.guard';

describe('authOrganizerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authOrganizerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
