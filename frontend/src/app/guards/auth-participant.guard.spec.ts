import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {authParticipantGuard} from './auth-participant.guard';

describe('authParticipantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authParticipantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
