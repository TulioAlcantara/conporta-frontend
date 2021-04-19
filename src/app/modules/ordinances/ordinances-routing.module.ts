import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdinanceInfoComponent } from './components/ordinance-info/ordinance-info.component';
import { OrdinancesListComponent } from './components/ordinances-list/ordinances-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdinancesListComponent,
  },
  {
    path: ':id',
    component: OrdinanceInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdinancesRoutingModule {}
