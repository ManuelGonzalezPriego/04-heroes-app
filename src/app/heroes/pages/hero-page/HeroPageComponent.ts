import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interface/hero.interface';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: []
})
export class HeroPageComponent implements OnInit{
public hero?:Hero

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.params);

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id)) //Desestructuramos el el param y obtenemos el id para poder pasarlo al servicio
    ).subscribe(hero => {
      if(!hero) return this.router.navigate(['heroes/list']);

      this.hero=hero;
      console.log(hero);
      return;
      });

  }

}
