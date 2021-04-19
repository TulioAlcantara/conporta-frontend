import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminUnit, PartialAdminUnit } from '../../shared/models/admin-unit';
import { PaginatedResponse } from '../../shared/models/paginated_response';

@Injectable({
  providedIn: 'root',
})
export class AdminUnitsService {
  constructor(private http: HttpClient) {}

  loadAllAdminUnits(): Observable<PaginatedResponse<AdminUnit>> {
    return this.http.get<PaginatedResponse<AdminUnit>>(
      `${environment.apiBaseUrl}/adminunit/`
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

  loadMembers(adminUnitId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
