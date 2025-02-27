import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interface/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(private heroesService:HeroesService){}

  public searchInput=new FormControl('');

  // Continuamos con el autocomplete: Para almacenar los datos de la búsqueda,
  // creamos una propiedad en la clase search, y un método que realice la búsqueda.
  // Por el momento tan sólo mostraremos el valor buscado
  public heroes:Hero[]=[];
  public selectedHero?:Hero;

  public searchHero(){
    const value:string= this.searchInput.value||'';

    // Ahora que ya tenemos el valor buscado, vamos a llamar al servicio,
    //  y almacenamos los datos recibidos en la propiedad heroes
    this.heroesService.getSuggestions(value).subscribe(
      heroes=>this.heroes=heroes
    );
  }

  public onSelectedOption(event: MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectedHero=undefined
      return
    }

    const hero:Hero=event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero=hero;
  }
}
