import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interface/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  // Cuando hagamos el http.get, tenemos que indicar la URL del backend. Recordemos que tenemos la URL definida en environments. Vamos a crear una constante privada, y vamos a utilizar environments a secas, sin el prod. El prod se modificará sólo cuando lo solicitemos, gracias a la directriz que hemos introducido en angular.json.
  private baseUrl: string=environments.baseUrl;

  constructor(private http: HttpClient) { }

  //Este get obtendra la información de nuestr api y le dara el formateo de la interfaz hero
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.baseUrl+"/heroes");//Cogeremos nuestra base url y le añadiremos /heroes para acceder a la info de heroes
  }
}
