import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/User';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl=environments.baseUrl;
  private user?:User;

  constructor(private http:HttpClient) { }

  get currentUser():User|undefined{
    if(!this.user) return undefined;

    // Esta forma de usarlo es incorrecta ya que Js pasa las interfaces
    // Y objetos por referencia permitiendo así modificar el original y
    // Eso no lo podemos permitir en este caso
    // return this.user;

    // Opción1 : No permite deep clone, pero para este caso baldria
    // return {...this.user}

    // Opción 2 y mas correcta ya que esta si nos permite deep clone
    return structuredClone(this.user);
  }

  login(email:string,password: string):Observable<User>{
    // Back end normal
    // this.http.post('login',{email,password});

    // Nuesto back end
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user=>this.user=user),
        tap(user=>localStorage.setItem('token', user.id))
      );
  }
}
