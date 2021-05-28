import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { PartialProfile } from '../../../../shared/models/profile';
import { ProfilesService } from '../../profiles.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
})
export class ProfilesListComponent implements OnInit {
  searchFilterFormControl = new FormControl();
  searchFilter: string = '';
  isLoading: boolean = true;
  ordinancesList: PartialProfile[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'is_active'];

  constructor(public profileService: ProfilesService) {}

  ngOnInit(): void {
    this.loadAllProfiles();
    this.subscribeToSearchFilter();
  }

  loadAllProfiles() {
    this.profileService
      .loadAllProfiles(this.searchFilter)
      .subscribe((paginatedResponse) => {
        this.ordinancesList = paginatedResponse.results;
        this.isLoading = false;
      });
  }

  subscribeToSearchFilter() {
    this.isLoading = true;
    this.searchFilterFormControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((filterInput) => (this.searchFilter = filterInput))
      )
      .subscribe(() => this.loadAllProfiles());
  }
}
