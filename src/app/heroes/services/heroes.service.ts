import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
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

  getHeroById(id:string):Observable<Hero|undefined>{
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id}`).
      pipe( catchError( error => of (undefined)));//Cogeremos nuestra base url y le añadiremos /heroes para acceder a la info de heroes
  }

  getSuggestions(query:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

  // Insertar nuevo heroe
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  // Actualizar un heroe
  updateHero(hero:Hero):Observable<Hero>{
    if(!hero.id)throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  // Elimina un heroe por su id y devulve un observabel que va a ser el que nos indique si se borro o no,
  // esto es devido a que usamos el hero pipe imege (Actualizamos el metodo con los pipe para poder que al subscribirnos en new-page pongamos el
  // mensage directamente)
  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      map( response => true ),
      catchError( error => of(false) )
    )
  }

}
