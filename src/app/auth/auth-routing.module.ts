import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes:Routes=[
  // localhost:4200/auth/
  { path: '',
    component: LayoutPageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
