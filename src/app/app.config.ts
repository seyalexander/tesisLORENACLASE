import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptorService } from './infraestructure/driven-adapter/login/error-interceptor.service';
import { ClienteInterceptorService } from './infraestructure/core/interceptor/cliente-interceptor.service';
import { marcaAutosGateway } from './domain/models/marcas-autos/gateway/marca-autos-gateway';
import { MarcaAutosApiService } from './infraestructure/driven-adapter/marca-autos/marca-autos-api.service';
import { modeloAutosGateway } from './domain/models/modelo-autos/gateway/modelo-autos-gateway';
import { autosGateway } from './domain/models/autos/gateway/autos-gateway';
import { tipoDocumentoGateway } from './domain/models/tipo-documentos/gateway/tipo-documentos-gateway';
import { ModeloAutosApiService } from './infraestructure/driven-adapter/modelo-autos/modelo-autos-api.service';
import { AutosApiService } from './infraestructure/driven-adapter/autos/autos-api.service';
import { TipoDocumentoApiService } from './infraestructure/driven-adapter/tipo-documento/tipo-documento-api.service';
import { citasGateway } from './domain/models/citas/gateway/citas-gateway';
import { CitasApiService } from './infraestructure/driven-adapter/citas/citas-api.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { choferesGateway } from './domain/models/choferes/gateway/choferes-gateway';
import { ChoferesApiService } from './infraestructure/driven-adapter/choferes/choferes-api.service';
import { clientesGateway } from './domain/models/clientes/gateway/clientes-gateway';
import { ClientesApiService } from './infraestructure/driven-adapter/clientes/clientes-api.service';
import { horasGateway } from './domain/models/horas/gateway/horas-gateway';
import { HorasApiService } from './infraestructure/driven-adapter/horas/horas-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: marcaAutosGateway, useClass: MarcaAutosApiService },
    { provide: modeloAutosGateway, useClass: ModeloAutosApiService },
    { provide: autosGateway, useClass: AutosApiService },
    { provide: citasGateway, useClass: CitasApiService },
    { provide: clientesGateway, useClass: ClientesApiService},
    { provide: choferesGateway, useClass: ChoferesApiService },
    { provide: tipoDocumentoGateway, useClass: TipoDocumentoApiService },
    { provide: horasGateway, useClass: HorasApiService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide:HTTP_INTERCEPTORS,useClass:ClienteInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    provideHttpClient(withInterceptorsFromDi())
  ]
};
