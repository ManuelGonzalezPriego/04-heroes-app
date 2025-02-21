import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {
  public heroForm=new FormGroup({
    id:new FormControl<string>('',{nonNullable:true}),
    superhero:new FormControl<string>(''),
    publisher:new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:new FormControl(''),
    first_appearance:new FormControl('') ,
    characters:new FormControl('') ,
    alt_img:new FormControl('')
  });

  public publishers=[
    {"id": "DC Comics","desc": "DC - Comics"},
    {"id": "Marvel Comics","desc": "Marvel - Comics"}
  ]

  public hero:Hero=null!;

  constructor(private heroesService:HeroesService, public router:Router){}

  get currentHero():Hero{
    return this.heroForm.value as Hero;
  }

  onSubmit():void{
    if(this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero=>{
        // TODO: Mostrar snackbar
      });
      return
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero=>{
        // TODO: Mostrar snackbar y navegar a /hero/edit/hero.id
      });
  }

  ngOnInit():void{
    if(!this.router.url.includes('edit')) return;

    const urlSplit:string[]=this.router.url.split('/');
    this.heroesService.getHeroById(urlSplit[urlSplit.length-1]).subscribe(hero=>{

      // Angular mola mucho y como mola al poner ! delante del objeto heroe comprueva si es valido
      if(!hero){
        this.router.navigate(['/']);
        return;
      }

      this.hero=hero;

      this.heroForm.reset({
        id: this.hero.id,
        superhero: this.hero.superhero,
        publisher: this.hero.publisher,
        alter_ego: this.hero.alter_ego,
        first_appearance: this.hero.first_appearance,
        characters: this.hero.characters,
        alt_img: this.hero.alt_img
      });
    });
  }
}
