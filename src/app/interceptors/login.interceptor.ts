import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { inject } from '@angular/core';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const loginservice = inject(LoginService);
  const newreq = req.clone();
  return next(newreq).pipe(catchError((error) => {
    if (
      error instanceof HttpErrorResponse &&
      error.status === 403
    ) {
      loginservice.isLoggedInChanged.next(false);
      loginservice.isUnknownUserChanged.next(true);
      return throwError(() => error);
    }
      return throwError(() => error);
  }));
};

