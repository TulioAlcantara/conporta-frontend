import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUnitsRoutingModule } from './admin-units-routing.module';
import { AdminUnitsListComponent } from './components/admin-units-list/admin-units-list.component';

@NgModule({
  declarations: [AdminUnitsListComponent],
  imports: [CommonModule, AdminUnitsRoutingModule],
})
export class AdminUnitsModule {}
