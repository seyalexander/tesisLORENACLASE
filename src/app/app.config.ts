import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptorService } from './infraestructure/driven-adapter/login/error-interceptor.service';
import { ClienteInterceptorService } from './infraestructure/core/interceptor/cliente-interceptor.service';
import { TipoDocumentoApiService } from './infraestructure/driven-adapter/tipo-documento/tipo-documento-api.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { clase1Gateway } from './domain/models/clase1/gateway/clase5-gateway';
export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: clase1Gateway, useClass: TipoDocumentoApiService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide:HTTP_INTERCEPTORS,useClass:ClienteInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    provideHttpClient(withInterceptorsFromDi())
  ]
};
