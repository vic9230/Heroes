import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {delay, Observable, of, switchMap, throwError} from 'rxjs';
import {MockApiService} from "./mock-api.service";

export const mockApiInterceptor = (request: HttpRequest<unknown>,
                                   next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  // Inyectar el servicio MockApiService para manejar las peticiones
  const mockApiService = inject(MockApiService);

  // Buscar el manejador correspondiente para la petición
  const {
    handler,
    urlParams,
  } = mockApiService.findHandler(request.method.toUpperCase(), request.url);

  // Si no se encuentra un manejador, continuar con la petición original
  if (!handler) {
    return next(request);
  }

  // Asignar la petición y los parámetros de URL al manejador
  handler.request = request;
  handler.urlParams = urlParams;

  return handler.response.pipe(
    // Aplicar un retraso
    delay(handler.delay ?? 1 ?? 0),
    switchMap((response) => {

      // Si la respuesta es nula, devolver un error 404
      if (!response) {
        response = new HttpErrorResponse({
          error: 'NOT FOUND',
          status: 404,
          statusText: 'NOT FOUND',
        });

        return throwError(response);
      }

      // Estructurar la respuesta
      const data = {
        status: response[0],
        body: response[1],
      };

      // Respuesta correcta
      if (data.status >= 200 && data.status < 300) {
        response = new HttpResponse({
          body: data.body,
          status: data.status,
          statusText: 'OK',
        });

        return of(response);
      }

      // Crear un error HTTP basado en la respuesta
      response = new HttpErrorResponse({
        error: data.body.error,
        status: data.status,
        statusText: 'ERROR',
      });

      return throwError(response);
    }));
};
