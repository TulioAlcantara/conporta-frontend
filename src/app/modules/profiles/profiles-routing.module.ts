import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
