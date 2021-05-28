import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesListComponent,
  },
  {
    path: ':id',
    component: ProfileInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
