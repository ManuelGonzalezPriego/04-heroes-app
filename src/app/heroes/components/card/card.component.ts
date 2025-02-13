import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{
  @Input()
  public hero!:Hero; //Con esto obligamos que para este componente reciva un objeto heroe

  ngOnInit(): void {
    // Hero debe ser inicializado
    if(!this.hero) throw new Error('Hero property is required.');
  }
}
