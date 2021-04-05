import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdinancesRoutingModule } from './ordinances-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrdinancesListComponent } from './components/ordinances-list/ordinances-list.component';
import { OrdinancesService } from './ordinances.service';

@NgModule({
  declarations: [OrdinancesListComponent],
  imports: [CommonModule, SharedModule, OrdinancesRoutingModule],
  providers: [OrdinancesService],
})
export class OrdinancesModule {}
