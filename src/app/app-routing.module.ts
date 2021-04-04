import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
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
    canActivate: [AuthGuardService],
  },
  {
    path: 'unidades-administrativas',
    loadChildren: () =>
      import('./modules/admin-units/admin-units.module').then((m) => m.AdminUnitsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./modules/profiles/profiles.module').then((m) => m.ProfilesModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
