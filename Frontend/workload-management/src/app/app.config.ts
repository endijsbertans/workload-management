import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiModule } from './services/api.module';
import { routes } from './app.routes';
import { authInterceptor } from './services/interceptor/http-token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import {environment, prodEnvironment} from "../environments/environment.prod";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(ApiModule.forRoot({ rootUrl: prodEnvironment.apiUrl }))
  ]
};

