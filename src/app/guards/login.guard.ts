import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(MatSnackBar);
  const loginservice = inject(LoginService);
  const router = inject(Router);
  if(loginservice.isLoggedIn == false)
  {
    snackBar.open("Session abgelaufen!", "OK", {
      duration: 3000
    });
    router.navigate(['/','login']);
  }
  return loginservice.isLoggedIn;
};
