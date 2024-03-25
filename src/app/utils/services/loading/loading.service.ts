import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
  private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _urlMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  _setLoadingStatus(status: boolean, url: string): void {
    if (!url) {
      return;
    }

    if (status) {
      this._urlMap.set(url, status);
      this._show$.next(true);
    } else if (!status && this._urlMap.has(url)) {
      this._urlMap.delete(url);
    }

    if (this._urlMap.size === 0) {
      this._show$.next(false);
    }
  }
}
