import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AdminUnit,
  AdminUnitMember,
  PartialAdminUnit,
  PartialAdminUnitMember,
} from '../../shared/models/admin-unit';
import { PaginatedResponse } from '../../shared/models/paginated_response';
import { Profile } from '../../shared/models/profile';

@Injectable({
  providedIn: 'root',
})
export class AdminUnitsService {
  constructor(private http: HttpClient) {}

  loadAllAdminUnits(
    searchFilter?: string
  ): Observable<PaginatedResponse<AdminUnit>> {
    let params = new HttpParams();
    if (searchFilter) params = params.append('search', searchFilter);
    return this.http.get<PaginatedResponse<AdminUnit>>(
      `${environment.apiBaseUrl}/adminunit/`,
      { params: params }
    );
  }

  loadAdminUnit(adminUnitId: number): Observable<AdminUnit> {
    return this.http.get<AdminUnit>(
      `${environment.apiBaseUrl}/adminunit/${adminUnitId}/`
    );
  }

  createAdminUnit(newAdminUnit: PartialAdminUnit): Observable<AdminUnit> {
    return this.http.post<AdminUnit>(
      `${environment.apiBaseUrl}/adminunit/`,
      newAdminUnit
    );
  }

  updateAdminUnit(adminUnit: PartialAdminUnit): Observable<AdminUnit> {
    return this.http.patch<AdminUnit>(
      `${environment.apiBaseUrl}/adminunit/${adminUnit.id}/`,
      adminUnit
    );
  }

  loadMembers(
    adminUnitId: number
  ): Observable<PaginatedResponse<AdminUnitMember>> {
    return this.http.get<PaginatedResponse<AdminUnitMember>>(
      `${environment.apiBaseUrl}/adminunit/${adminUnitId}/members/`
    );
  }

  loadProfilesThatArentMembers(
    adminUnitId: number,
    searchFilter?: string
  ): Observable<Profile[]> {
    let params = new HttpParams();
    if (searchFilter) params = params.append('search', searchFilter);
    return this.http.get<Profile[]>(
      `${environment.apiBaseUrl}/adminunit/${adminUnitId}/non_member_profiles/`,
      { params: params }
    );
  }

  saveNewMember(newMember: PartialAdminUnitMember) {
    return this.http.post<PartialAdminUnitMember>(
      `${environment.apiBaseUrl}/adminunitmember/`,
      newMember
    );
  }
}
