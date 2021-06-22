import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  userName$: Observable<string> = new Observable<string>();
  userIsBoss$: Observable<boolean> = new Observable<boolean>();

  isBosslinks = [
    { path: 'portarias', label: 'PORTARIAS' },
    { path: 'unidades-administrativas', label: 'UNIDADES ADMINISTRATIVAS' },
    { path: 'pessoas', label: 'PESSOAS' },
  ];

  regularUserLinks = [
    { path: 'portarias', label: 'PORTARIAS' },
  ]; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.userName$ = this.authService.loggedUserName;
    this.userIsBoss$ = this.authService.userIsBoss;
  }
  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
