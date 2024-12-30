import { CanActivateFn ,Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { FormService } from '../_services/form.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();

  const token = sessionStorage.getItem('jwt');



  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true
};
