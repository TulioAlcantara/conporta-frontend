import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUnitInfoComponent } from './components/admin-unit-info/admin-unit-info.component';
import { AdminUnitsListComponent } from './components/admin-units-list/admin-units-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUnitsListComponent,
  },
  {
    path: ':id',
    component: AdminUnitInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUnitsRoutingModule {}
