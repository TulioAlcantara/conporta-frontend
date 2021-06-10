import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService } from '../../../../auth/auth.service';
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
  isLoadingUserMentionedOrdinances: boolean = true;
  isLoadingUserNotifications: boolean = false;
  ordinancesFromUserAdminUnitList: Ordinance[] = [];
  userMentionedOrdinancesList: Ordinance[] = [];
  userNotificationsOrdinances: Ordinance[] = [];
  displayedColumns: string[] = ['id', 'theme', 'expedition_date'];
  userAdminUnits: string[] = [];
  userAdminUnitsString: string = '';
  isBoss: boolean = false;

  constructor(
    private ordinancesService: OrdinancesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isBoss = this.authService.userCompleteProfile.is_boss;
    this.userAdminUnits = this.authService.userCompleteProfile.memberships.map(
      (memberships) => memberships.admin_unit.name
    );
    this.userAdminUnitsString = this.userAdminUnits.join(', ');
    this.loadOrdinancesFromUserAdminUnits();
    this.subscribeToSearchFilter();
    this.loadOrdinanceWithMentionToUser();
    if(this.isBoss){
      this.isLoadingUserNotifications = true
      this.loadUserNotificationsOrdinances()
    }
  }

  loadOrdinancesFromUserAdminUnits(): void {
    this.ordinancesService
      .loadOrdinancesFromUserAdminUnits(this.searchFilter)
      .subscribe((paginatedResponse) => {
        this.ordinancesFromUserAdminUnitList = paginatedResponse.results;
        this.isLoading = false;
      });
  }

  loadOrdinanceWithMentionToUser(): void {
    let userMembershipsIdList =
      this.authService.userCompleteProfile.memberships.map(
        (membership) => membership.id
      );

    if (userMembershipsIdList.length > 0) {
      this.ordinancesService
        .loadOrdinanceWithMentionToUser(userMembershipsIdList)
        .subscribe((ordinances) => {
          this.userMentionedOrdinancesList = ordinances;
          this.isLoadingUserMentionedOrdinances = false;
        });
    }
  }

  loadUserNotificationsOrdinances(): void {
    let userMembershipsIdList =
      this.authService.userCompleteProfile.memberships.map(
        (membership) => membership.id
      );

    if (userMembershipsIdList.length > 0) {
      this.ordinancesService
        .loadUserNotificationsOrdinances(userMembershipsIdList)
        .subscribe((ordinances) => {
          this.userNotificationsOrdinances = ordinances;
          this.isLoadingUserNotifications = false;
        });
    }
  }

  subscribeToSearchFilter() {
    this.isLoading = true;
    this.searchFilterFormControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((filterInput) => (this.searchFilter = filterInput))
      )
      .subscribe(() => this.loadOrdinancesFromUserAdminUnits());
  }
}
