import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { AdminUnit } from '../../../../shared/models/admin-unit';
import { AdminUnitsService } from '../../admin-units.service';

@Component({
  selector: 'app-admin-units-list',
  templateUrl: './admin-units-list.component.html',
  styleUrls: ['./admin-units-list.component.scss'],
})
export class AdminUnitsListComponent implements OnInit {
  searchFilterFormControl = new FormControl();
  adminUnitsList: AdminUnit[] = [];
  tableIsLoading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'initials', 'year'];
  isLoading: boolean = false;
  searchFilter: string = '';

  constructor(private adminUnitsService: AdminUnitsService) {}

  ngOnInit(): void {
    this.loadAllAdminUnits();
    this.subscribeToNameFilter();
  }

  loadAllAdminUnits() {
    this.isLoading = true;
    this.adminUnitsService
      .loadAllAdminUnits(this.searchFilter)
      .subscribe((paginatedResponse) => {
        this.adminUnitsList = paginatedResponse.results;
        this.isLoading = false;
      });
  }

  subscribeToNameFilter() {
    this.isLoading = true;
    this.searchFilterFormControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((filterInput) => (this.searchFilter = filterInput))
      )
      .subscribe(() => this.loadAllAdminUnits());
  }
}
