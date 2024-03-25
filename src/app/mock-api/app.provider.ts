import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider
} from '@angular/core';
import {mockApiInterceptor} from "./mock-api.interceptor";
import {loadingInterceptor} from "../utils/services/loading/loading.interceptor";
import {LoadingService} from "../utils/services/loading/loading.service";

export type ProviderConfig = {
  mockApi?: {
    services?: any[];
  },
}

export const provideApp = (config: ProviderConfig): Array<Provider | EnvironmentProviders> => {

  // Inicializar el array de proveedores con los interceptores y servicios de carga
  const providers: (Provider | EnvironmentProviders)[] = [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    {
      // Proveer el inicializador de entorno para el servicio de carga
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(LoadingService),
      multi: true,
    },
  ];


  if (config?.mockApi?.services) {
    // Añadir el interceptor del mock API y el inicializador de la aplicación
    providers.push(
      provideHttpClient(withInterceptors([mockApiInterceptor])),
      {
        provide: APP_INITIALIZER,
        deps: [...config.mockApi.services],
        useFactory: () => (): any => null,
        multi: true,
      },
    );
  }

  return providers;
};
