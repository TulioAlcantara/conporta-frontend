import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portarias',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'portarias',
    loadChildren: () =>
      import('./modules/ordinances/ordinances.module').then((m) => m.OrdinancesModule),
  },
  {
    path: 'unidades-administrativas',
    loadChildren: () =>
      import('./modules/ordinances/ordinances.module').then((m) => m.OrdinancesModule),
  },
  {
    path: 'pessoas',
    loadChildren: () =>
      import('./modules/ordinances/ordinances.module').then((m) => m.OrdinancesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
