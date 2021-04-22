import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiPaths } from '../../shared/api-paths';
import { Ordinance } from '../../shared/models/ordinance';
import { PaginatedResponse } from '../../shared/models/paginated_response';

@Injectable({
  providedIn: 'root',
})
export class OrdinancesService {
  constructor(private http: HttpClient) {}

  loadAllOrdinances(
    searchFilter?: string
  ): Observable<PaginatedResponse<Ordinance>> {
    let params = new HttpParams();
    if (searchFilter) params = params.append('search', searchFilter);
    return this.http.get<PaginatedResponse<Ordinance>>(
      `${environment.apiBaseUrl}/ordinance/`,
      { params: params }
    );
  }

  loadOrdinance(ordinanceId: number): Observable<Ordinance> {
    return this.http.get<Ordinance>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/`
    );
  }
}
