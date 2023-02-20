import { Component, OnInit } from '@angular/core';

import { Result } from '../personaje';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Result[] = [];

  constructor(private heroService: HeroService) { }

  public page: number = 0;
  public limit: number = 20;
  public total: number = 0;
  public totalPages: number = 0;

  ngOnInit(): void {
    this.getHeroes(this.page, this.limit);
  }

  getHeroes(offset:number = 0, limit:number = 1): void {
    this.heroService.getHeroes(offset, limit)
      .subscribe(heroes => {
        console.log(heroes.data);
        this.total = heroes.data.total;
        this.totalPages = Math.floor(this.total / this.limit);
        for(let i = 0; i < heroes.data.count; i++) {//ponemos count porque es el numero de resultados que hay en esa pagina
          //console.log(heroes.data.results[i]);
          this.heroes.push(heroes.data.results[i])
        }
        
      });
    
  }

  principio() {
      this.page = 0;
      this.heroes = [];
      this.getHeroes(this.page, this.limit);
  }
  
  atras() {
    if (this.page > 0) {
      this.page -= 1;
      this.heroes = [];
      this.getHeroes(this.page, this.limit);
    }
  }

  delante() {
    if(this.page < this.totalPages) {
      this.page += 1;
      this.heroes = [];
      this.getHeroes(this.page, this.limit); 
    }
    
  }

  ultima() {
    this.page = this.totalPages;
    this.heroes = [];
    this.getHeroes(this.page, this.limit);
}

  
}
