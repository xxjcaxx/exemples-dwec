import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { supabaseLoginGuard } from './supabase-login.guard';

describe('supabaseLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => supabaseLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
