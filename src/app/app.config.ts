import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loginInterceptor } from './interceptors/login.interceptor';
import { headerInterceptor } from './interceptors/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
              provideRouter(routes),
              provideClientHydration(),
              provideHttpClient(withFetch(),withInterceptors([loginInterceptor, headerInterceptor])),
              provideAnimationsAsync()
              ]
};
