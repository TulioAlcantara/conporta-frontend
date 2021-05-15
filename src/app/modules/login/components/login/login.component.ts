import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { UserLogin } from '../../../../shared/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/portarias']);
    }
  }

  loginUser(): void {
    let user: UserLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.loginUser(user).subscribe(
      (profile) => {
        this.router.navigate(['/portarias']);
        this.authService.userProfile = profile;
      },
      (error) => {
        this.snackBar.open('Não foi possível conectar!', 'FECHAR', {
          duration: 5000,
        });
      }
    );
  }
}
