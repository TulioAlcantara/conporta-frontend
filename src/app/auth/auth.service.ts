import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AdminUnitMember } from '../shared/models/admin-unit';
import { PartialProfile } from '../shared/models/profile';
import { UserLogin } from '../shared/models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  userProfile: PartialProfile = new PartialProfile();
  userMemberships: AdminUnitMember[] = [];


  constructor(private Router: Router, private http: HttpClient) {}

  loginUser(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/login/`, user).pipe(
      tap((token) => this.storeToken(token.token)),
      switchMap(() => this.loadUserProfile()),
    );
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  loadUserProfile(): Observable<PartialProfile> {
    return this.http.get<PartialProfile>(
      `${environment.apiBaseUrl}/profile/current_user_profile/`
    );
  }

  loadUserMemberships(): Observable<AdminUnitMember>{
    return this.http.get<AdminUnitMember>(
      `${environment.apiBaseUrl}/adminunitmember/current_user_admin_unit_memberships/`
    );
  }
}
