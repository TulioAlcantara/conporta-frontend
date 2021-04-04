import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiPaths } from '../../shared/api-paths';

@Injectable({
  providedIn: 'root',
})
export class OrdinancesService {
  constructor(private http: HttpClient) {}
  loadAllOrdinances(): Observable<any[]> {
    return this.http.get<any>(`${environment.apiBaseUrl}/ordinance/`);
  }
}
