
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BigResponse } from './personaje';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {
  //Es normal dividir la url en variables por parametro, url externa 
  private url:string = 'https://gateway.marvel.com/v1/public/characters';
  private ts = '?ts=heroes';
  private apiKey = '&apikey=5655ce53e8e5750adf4d996dca4a9495'
  private hash = '&hash=f159dbf44a48da73c405e9b0ed934e92'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(offset:number = 0, limit:number = 1): Observable<BigResponse> {
    return this.http.get<BigResponse>(this.url+this.ts+this.apiKey+this.hash+`&offset=${offset}`+`&limit=${limit}`)
  }


  getHero(id: number): Observable<BigResponse> {
    return this.http.get<BigResponse>(this.url+`/${id}`+this.ts+this.apiKey+this.hash).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),//nos permite realizar una operación, por ejemplo para ver por consola
      catchError(this.handleError<BigResponse>(`getHero id=${id}`)) //Gestionar un error
    );
  }

  searchHeroes(term: string): Observable<BigResponse> {
    if (!term.trim()) {
      //Si no buscas nada, no muestro nada
      return of({"code": 200, data: {offset: 0, limit: 20, total: 0, count: 0, results: []}, "status": ""});
    }
    return this.http.get<BigResponse>(this.url+this.ts+this.apiKey+this.hash+`&nameStartsWith=${term}`).pipe(
      //Si hay resultado, se indica que hay heroes, sino se indica que no hay
      tap(x => x.data.count ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<BigResponse>('searchHeroes', {"code": 400,  data: {offset: 0,limit: 20, total: 0, count: 0, results: []}, "status": ""}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //No es el caso pero podriamos tener que marcar algun error ante un código, por ejemplo tiene sentido que si un herore no esta
      //bien consturido se marque como erroneo, pero no se rompa el flujo
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
