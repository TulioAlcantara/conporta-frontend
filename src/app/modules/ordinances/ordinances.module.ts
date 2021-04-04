import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdinancesRoutingModule } from './ordinances-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrdinancesListComponent } from './components/ordinances-list/ordinances-list.component';

@NgModule({
  declarations: [OrdinancesListComponent],
  imports: [SharedModule, OrdinancesRoutingModule],
})
export class OrdinancesModule {}
