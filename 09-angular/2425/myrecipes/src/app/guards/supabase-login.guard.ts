import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';

export const supabaseLoginGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const supabaseService: SupabaseService = inject(SupabaseService);
  const urlTree: UrlTree = router.parseUrl('./main');
  return supabaseService.loggedSubject.getValue() ? true : urlTree;

};
