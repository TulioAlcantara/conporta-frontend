import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../../shared/models/paginated_response';
import { Profile } from '../../shared/models/profile';
import { ProfilesModule } from './profiles.module';

@Injectable({
  providedIn: 'any',
})
export class ProfilesService {
  constructor(private http: HttpClient) {}

  loadAllProfiles(
    searchFilter?: string
  ): Observable<PaginatedResponse<Profile>> {
    let params = new HttpParams();
    if (searchFilter) params = params.append('search', searchFilter);
    return this.http.get<PaginatedResponse<Profile>>(
      `${environment.apiBaseUrl}/profile/`,
      { params: params }
    );
  }
}
