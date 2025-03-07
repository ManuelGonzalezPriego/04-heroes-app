import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  // Importamos los path que vamos a usar y los cargamos de forma perezosa
  { path: 'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  { path: 'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canMatch:[canMatchGuard], // Amclamos la función de canMatch
    canActivate:[canActivateGuard]
  },
  { path: '404',
    component: Error404PageComponent
  },

  // Definimos que pasará si dejamos el path vacio o ponemos uno que no existe
  { path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
