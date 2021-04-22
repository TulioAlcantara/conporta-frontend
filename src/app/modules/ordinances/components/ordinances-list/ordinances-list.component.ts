import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Ordinance } from '../../../../shared/models/ordinance';
import { PaginatedResponse } from '../../../../shared/models/paginated_response';
import { OrdinancesService } from '../../ordinances.service';

@Component({
  selector: 'app-ordinances-list',
  templateUrl: './ordinances-list.component.html',
  styleUrls: ['./ordinances-list.component.scss'],
})
export class OrdinancesListComponent implements OnInit {
  searchFilterFormControl = new FormControl();
  searchFilter: string = '';
  isLoading: boolean = true;
  ordinancesList: Ordinance[] = [];
  displayedColumns: string[] = ['id', 'theme', 'expedition_date'];

  constructor(private ordinancesService: OrdinancesService) {}

  ngOnInit(): void {
    this.loadAllOrdinances();
    this.subscribeToSearchFilter();
  }

  loadAllOrdinances() {
    this.ordinancesService
      .loadAllOrdinances(this.searchFilter)
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
      .subscribe(() => this.loadAllOrdinances());
  }
}
