import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interface/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero:Hero): string {
    var resulset:string=`assets/heroes/${hero.id}.jpg`;

    if(!hero.id && !hero.alt_img){
      resulset='assets/no-image.png';
    }
    else if(hero.alt_img){
      resulset=hero.alt_img
    }

    return resulset;
  }

}
