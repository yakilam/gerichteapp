import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  var token = localStorage.getItem("token");
  if(token != null){
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(modifiedReq);
  } else {
    return next(req);
  }
  
};
