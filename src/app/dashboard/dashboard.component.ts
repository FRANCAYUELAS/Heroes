import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Result} from '../personaje';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  public heroes: Result[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    for(let i = 0; i < 8; i++) {
      let random = Math.floor(Math.random() * (1000 + 1));
      this.getHeroes(random);
    }
  }

  getHeroes(offset:number = 0, limit:number = 1): void {
    this.heroService.getHeroes(offset, limit)
      .subscribe(heroes => {
        console.log(heroes);
        this.heroes.push(heroes.data.results[0])
      });
    
  }
}
