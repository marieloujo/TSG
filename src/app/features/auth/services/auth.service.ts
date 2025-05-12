import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/services/http-client.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from '@core/services/token.service';
import { LoginRequest } from '../types/login-request';
import { LoginResponse } from '../types/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseEndpoint = environment.AUTH_ROUTE;

  constructor(private httpClientService: HttpClientService,
    private tokenService: TokenService) { }

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.httpClientService.post(`${this.baseEndpoint}/login/`, body)
  }

  logout(): Observable<any> {
    return this.httpClientService.post(`${this.baseEndpoint}/logout`, {});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  saveTokenAndUser(data: LoginResponse): void {
    this.tokenService.storeToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

}
