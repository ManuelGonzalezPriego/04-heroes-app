import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interface/hero.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent {
  public heros:Hero[]=[];
  public heroes$:Observable<Hero[]>=new Observable<Hero[]>(); // Se usa el sufijo $ para indicar que es un Observable

  //Esta es la forma más correcta que he encontrado en internet ya que se asigna el Observable directamente y no hay que cerrar la sobscripción conexión
  constructor(private hero:HeroesService){
    this.heroes$=this.hero.getHeroes();
  }

  // Variable para almacenar el listado de heroes

  //Inyectar el servicio


  //Esta es una forma de hacerlo que es subscibiendonos a el obserbabel de forma manual pero la mas corracta es la otra
  ngOnInit():void{
    // this.hero.getHeroes().subscribe(i=>{this.heros=i});
  }
}
