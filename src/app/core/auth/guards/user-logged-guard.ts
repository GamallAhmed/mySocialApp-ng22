import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
export const userLoggedGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const platformId = inject(PLATFORM_ID);
   if (!isPlatformBrowser(platformId)) {
    return true;
  }
  if(localStorage.getItem('token')){
   return router.parseUrl('/timeline')
  }
  else{
    return true;
  }
};
