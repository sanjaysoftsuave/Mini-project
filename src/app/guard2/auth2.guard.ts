import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


export const auth2Guard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const router :Router = new Router();
  const token = sessionStorage.getItem('jwt')

  if (token) {
    router.navigate(['/home']);
    return false;
  }

  return true;



};
