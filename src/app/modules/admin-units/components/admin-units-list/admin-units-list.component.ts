import { Component, OnInit } from '@angular/core';
import { AdminUnit } from '../../../../shared/models/admin-unit';
import { AdminUnitsService } from '../../admin-units.service';

@Component({
  selector: 'app-admin-units-list',
  templateUrl: './admin-units-list.component.html',
  styleUrls: ['./admin-units-list.component.scss'],
})
export class AdminUnitsListComponent implements OnInit {
  adminUnitsList: AdminUnit[] = [];
  tableIsLoading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'intials', 'year'];

  constructor(private adminUnitsService: AdminUnitsService) {}

  ngOnInit(): void {
    this.adminUnitsService
      .loadAllAdminUnits()
      .subscribe((paginatedResponse) => {
        this.adminUnitsList = paginatedResponse.results;
      });
  }
}
