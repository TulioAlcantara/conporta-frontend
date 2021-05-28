import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfilesService } from './profiles.service';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

@NgModule({
  declarations: [ProfilesListComponent, ProfileInfoComponent],
  imports: [CommonModule, SharedModule, ProfilesRoutingModule],
  providers: [ProfilesService]
})
export class ProfilesModule {}
