import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';


@NgModule({
  declarations: [ProfilesListComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
