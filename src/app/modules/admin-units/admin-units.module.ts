import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUnitsRoutingModule } from './admin-units-routing.module';
import { AdminUnitsListComponent } from './components/admin-units-list/admin-units-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminUnitInfoComponent } from './components/admin-unit-info/admin-unit-info.component';

@NgModule({
  declarations: [AdminUnitsListComponent, AdminUnitInfoComponent],
  imports: [CommonModule, SharedModule, AdminUnitsRoutingModule],
})
export class AdminUnitsModule {}
