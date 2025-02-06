import { Component } from '@angular/core';

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
}
