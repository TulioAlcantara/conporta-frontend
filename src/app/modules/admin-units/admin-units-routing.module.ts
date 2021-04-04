import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUnitsListComponent } from './components/admin-units-list/admin-units-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUnitsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUnitsRoutingModule {}
