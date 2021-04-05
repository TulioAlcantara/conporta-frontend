import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Ordinance } from '../../../../shared/models/ordinance';
import { PaginatedResponse } from '../../../../shared/models/paginated_response';
import { OrdinancesService } from '../../ordinances.service';

@Component({
  selector: 'app-ordinances-list',
  templateUrl: './ordinances-list.component.html',
  styleUrls: ['./ordinances-list.component.scss'],
})
export class OrdinancesListComponent implements OnInit {
  ordinancesList: Ordinance[] = [];
  tableIsLoading: boolean = true;
  displayedColumns: string[] = ['id', 'theme', 'expedition_date'];

  constructor(private ordinancesService: OrdinancesService) {}

  ngOnInit(): void {
    this.ordinancesService.loadAllOrdinances().subscribe((paginatedResponse) => {
      this.ordinancesList = paginatedResponse.results;
    });
  }
}
