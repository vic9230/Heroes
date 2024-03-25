import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Heroe} from "../defs/Heroes";

export interface ListParams {
  search?: string;
}

export interface CreateParams {
  data: Heroe;
  id?: number;
}

export interface ReadParams {
  id: number;
}

export interface PartialUpdateParams {
  data: Heroe;
  id: number;
}

export interface DeleteParams {
  id: number;
}

@Injectable()
export class HeroeService {
  constructor(
    private http: HttpClient) {
  }

  list(params: ListParams): Observable<Heroe[]> {
    let httpParams = new HttpParams();
    if (params.search) {
      httpParams = httpParams.append('search', params.search);
    }
    const options = {
      params: httpParams,
    };
    return this.http.get<Heroe[]>('api/heroes', options);
  }

  create(params: CreateParams): Observable<Heroe> {
    const bodyParams = params.data;
    return this.http.post<Heroe>(`api/heroe`, bodyParams);
  }

  read(params: ReadParams): Observable<Heroe> {
    return this.http.get<Heroe>(`api/heroe/${params.id}`);
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<Heroe> {
    const bodyParams = params.data;
    return this.http.patch<Heroe>(`api/heroe/${params.id}`, bodyParams);
  }

  delete(params: DeleteParams): Observable<string> {
    return this.http.delete(`api/heroe/${params.id}`, {responseType: 'text'});
  }
}
