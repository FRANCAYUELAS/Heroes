import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap, map
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { BigResponse } from '../personaje';
import { Result } from '../personaje';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Result[]>; //Observador
  private searchTerms = new Subject<string>();//Suscripción

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    //Le mandamos al método el termino a buscar lo que se escribe
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //Estoy observando la respuesta que recibimos de la api
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),

      // sino hay cambios en term, no mandamos nada
      distinctUntilChanged(),

      // cambiar a una nueva búsqueda observable cada vez que cambia el término
      switchMap(term => {
        return this.heroService.searchHeroes(term)
         
      }),

      //obtenemos una respuesta, y de ella nos quedamos solo los datos que nos interesan
      map((response: BigResponse) => {
        console.log(response);
        
        if (response.data.total === 0) {
          console.log('no-results');
        }
        return response.data.results;
      })
    );
  }
}
