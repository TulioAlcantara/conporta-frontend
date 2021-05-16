import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdinancesRoutingModule } from './ordinances-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrdinancesListComponent } from './components/ordinances-list/ordinances-list.component';
import { OrdinancesService } from './ordinances.service';
import { OrdinanceInfoComponent } from './components/ordinance-info/ordinance-info.component';
import { CitationsComponent } from './components/ordinance-info/citations/citations.component';
import { DirectivesComponent } from './components/ordinance-info/directives/directives.component';
import { OrdinanceMembersComponent } from './components/ordinance-info/ordinance-members/ordinance-members.component';

@NgModule({
  declarations: [
    OrdinancesListComponent,
    OrdinanceInfoComponent,
    CitationsComponent,
    DirectivesComponent,
    OrdinanceMembersComponent,
  ],
  imports: [CommonModule, SharedModule, OrdinancesRoutingModule],
  providers: [OrdinancesService],
})
export class OrdinancesModule {}
