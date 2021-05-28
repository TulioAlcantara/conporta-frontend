import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../../shared/models/paginated_response';
import { PartialProfile, Profile } from '../../shared/models/profile';
import { ProfilesModule } from './profiles.module';

@Injectable({
  providedIn: 'any',
})
export class ProfilesService {
  constructor(private http: HttpClient) {}

  loadAllProfiles(
    searchFilter?: string
  ): Observable<PaginatedResponse<PartialProfile>> {
    let params = new HttpParams();
    if (searchFilter) params = params.append('search', searchFilter);
    return this.http.get<PaginatedResponse<PartialProfile>>(
      `${environment.apiBaseUrl}/profile/`,
      { params: params }
    );
  }

  loadProfile(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(
      `${environment.apiBaseUrl}/profile/${profileId}/`
    );
  }

  createProfile(profile: PartialProfile): Observable<PartialProfile> {
    return this.http.post<PartialProfile>(
      `${environment.apiBaseUrl}/profile/`, profile
    );
  }

  updateProfile(profile: PartialProfile): Observable<PartialProfile> {
    return this.http.patch<PartialProfile>(
      `${environment.apiBaseUrl}/profile/${profile.id}/`, profile
    );
  }
}
