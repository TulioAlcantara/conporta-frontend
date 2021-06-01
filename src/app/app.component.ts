import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'conporta-frontend';
  userMembershipsLoaded = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (
      this.authService.loggedIn.value &&
      !this.authService.userCompleteProfile.memberships.length
    ) {
      this.authService.loadUserMemberships().subscribe((userMemberships) => {
        this.authService.buildCompleteUserProfile(userMemberships);
        this.userMembershipsLoaded = true;
      });
      return;
    }
    this.userMembershipsLoaded = true;
  }
}
