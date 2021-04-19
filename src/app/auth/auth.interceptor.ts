import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('/login')) {
      return next.handle(httpRequest);
    }

    let token = this.authService.getToken();
    return next.handle(
      httpRequest.clone({ setHeaders: { Authorization: `JWT ${token}` } })
    );
  }
}
