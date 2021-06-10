import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiPaths } from '../../shared/api-paths';
import { AdminUnitMember } from '../../shared/models/admin-unit';
import {
  Citation,
  Directive,
  Ordinance,
  OrdinanceMember,
  OrdinanceNotification,
  PartialOrdinance,
  PartialOrdinanceMember,
} from '../../shared/models/ordinance';
import { PaginatedResponse } from '../../shared/models/paginated_response';

@Injectable({
  providedIn: 'any',
})
export class OrdinancesService {
  constructor(private http: HttpClient) {}

  loadOrdinancesFromUserAdminUnits(
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

  loadOrdinanceUserNotification(
    ordinanceId: number,
    memberId: number
  ): Observable<OrdinanceNotification[]> {
    let params = new HttpParams();
    params = params.append('ordinance', ordinanceId.toString());
    params = params.append('member', memberId.toString());
    return this.http.get<OrdinanceNotification[]>(
      `${environment.apiBaseUrl}/notification/`,
      { params: params }
    );
  }

  notificationAwareness(notificationId: number) {
    return this.http.get(
      `${environment.apiBaseUrl}/notification/${notificationId}/awareness/`
    );
  }

  loadOrdinanceWithMentionToUser(
    userMembershipsIdList: number[]
  ): Observable<Ordinance[]> {
    let params = new HttpParams();
    params = params.append(
      'user_memberships',
      userMembershipsIdList.toString()
    );
    return this.http.get<Ordinance[]>(
      `${environment.apiBaseUrl}/user-mentioned-ordinances-list/`,
      { params: params }
    );
  }

  updateOrdinance(
    ordinance: PartialOrdinance,
    statusChangedFromProposedToIssued: boolean
  ): Observable<Ordinance> {
    return this.http.patch<Ordinance>(
      `${environment.apiBaseUrl}/ordinance/${ordinance.id}/?ordinance-issued=${statusChangedFromProposedToIssued}`,
      ordinance
    );
  }

  createOrdinance(ordinance: PartialOrdinance): Observable<PartialOrdinance> {
    return this.http.post<PartialOrdinance>(
      `${environment.apiBaseUrl}/ordinance/`,
      ordinance
    );
  }

  loadOrdinanceCitations(ordinanceId: number): Observable<Citation[]> {
    return this.http.get<Citation[]>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/citations/`
    );
  }

  saveOrdinanceCitation(citation: Citation) {
    return this.http.post<Citation>(
      `${environment.apiBaseUrl}/ordinancecitation/`,
      citation
    );
  }

  loadNonCitedOrdinances(
    ordinanceId: number,
    search?: string
  ): Observable<Ordinance[]> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    return this.http.get<Ordinance[]>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/non_cited_ordinances/`,
      { params: params }
    );
  }

  loadOrdinanceMembers(ordinanceId: number): Observable<OrdinanceMember[]> {
    return this.http.get<OrdinanceMember[]>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/members/`
    );
  }

  saveOrdinanceMember(newOrdinanceMember: PartialOrdinanceMember) {
    return this.http.post<PartialOrdinanceMember>(
      `${environment.apiBaseUrl}/ordinancemember/`,
      newOrdinanceMember
    );
  }

  loadNonCitedAdminUnitMembers(
    ordinanceId: number,
    search?: string
  ): Observable<AdminUnitMember[]> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    return this.http.get<AdminUnitMember[]>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/non_cited_members/`,
      { params: params }
    );
  }

  loadOrdinanceDirectives(ordinanceId: number): Observable<Directive[]> {
    return this.http.get<Directive[]>(
      `${environment.apiBaseUrl}/ordinance/${ordinanceId}/directives/`
    );
  }

  saveDirective(newDirective: Directive) {
    return this.http.post<Directive>(
      `${environment.apiBaseUrl}/directive/`,
      newDirective
    );
  }
}
