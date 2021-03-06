import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import {
  AdminUnit,
  AdminUnitTypeEnum,
} from '../../../../shared/models/admin-unit';
import Utils from '../../../../shared/utils';
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
  displayedColumns: string[] = [
    'id',
    'name',
    'initials',
    'expedition_year',
    'type',
  ];
  isLoading: boolean = false;
  searchFilter: string = '';
  adminUnitTypeEnum = AdminUnitTypeEnum;

  constructor(private adminUnitsService: AdminUnitsService) {}

  ngOnInit(): void {
    this.loadAllAdminUnits();
    this.subscribeToSearchFilter();
  }

  loadAllAdminUnits() {
    this.isLoading = true;
    this.adminUnitsService
      .loadAllAdminUnitsPaginated(this.searchFilter)
      .subscribe((paginatedResponse) => {
        this.adminUnitsList = paginatedResponse.results;
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
      .subscribe(() => this.loadAllAdminUnits());
  }
}
