import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

const routes: Routes = [
  // localhost:4200/auth/
  { path: '',
    component: LayoutPageComponent,

    // Asi cargamos un path sin carga perezosa
    children:[
      {path: 'new-hero', component: NewPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
