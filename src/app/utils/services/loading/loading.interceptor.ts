import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "./loading.service";

export const loadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);

  loadingService._setLoadingStatus(true, req.url);

  return next(req).pipe(
    finalize(() => {
      loadingService._setLoadingStatus(false, req.url);
    }));
};
