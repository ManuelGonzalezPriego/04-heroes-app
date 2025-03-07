import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  //* Esta será nuestro diccionario con los labels, iconos y urls de nuestro sitio
  public sidebarItems=[
    {label:'Listado', icon: 'label', url: './list'},
    {label:'Añadir', icon: 'add', url: './new-hero'},
    {label:'Buscar', icon: 'search', url: './search'}
  ]

  constructor(private authService:AuthService,private router:Router){}

  onClick():void{
   this.authService.currentUser
  }

  onLogout():void{
    this.authService.logout()
    this.router.navigate(['/auth'])
  }

  get user():User|undefined{
    return this.authService.currentUser
  }
}
