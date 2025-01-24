import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  /*{ path: 'home',
    component: HomePageComponent
  },
  { path: "about",
    component: AboutPageComponent
  },
  { path: "**",
    component: 'home'
  }*/
];

@NgModule({
  imports: [ RouterModule.forChild( routes )],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
