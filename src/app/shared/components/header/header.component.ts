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

  links = [
    { path: 'portarias', label: 'PORTARIAS' },
    { path: 'unidades-administrativas', label: 'UNIDADES ADMINISTRATIVAS' },
    { path: 'pessoas', label: 'PESSOAS' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
