import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdinancesListComponent } from './components/ordinances-list/ordinances-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdinancesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdinancesRoutingModule {}
