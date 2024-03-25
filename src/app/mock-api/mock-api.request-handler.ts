import {HttpRequest} from '@angular/common/http';
import {Observable, of, take, throwError} from 'rxjs';
import {MockApiReplyCallback} from "./mock-api.types";

export class MockApiHandler {
  request!: HttpRequest<any>;
  urlParams!: { [key: string]: string };

  private _reply: MockApiReplyCallback = undefined;
  private _replyCount = 0;
  private _replied = 0;

  constructor(
    public url: string,
    public delay?: number,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get response(): Observable<any> {
    // Limite de ejecución
    if (this._replyCount > 0 && this._replyCount <= this._replied) {
      return throwError('Limite de ejecucion rechazado');
    }

    // Existencia de la funcion de callback
    if (!this._reply) {
      return throwError('No existe callback');
    }

    //Existencia de la solicitud
    if (!this.request) {
      return throwError('No existe respuesta');
    }

    this._replied++;

    const replyResult = this._reply({
      request: this.request,
      urlParams: this.urlParams,
    });

    if (replyResult instanceof Observable) {
      return replyResult.pipe(take(1));
    }

    return of(replyResult).pipe(take(1));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  reply(callback: MockApiReplyCallback): void {
    this._reply = callback;
  }

}


