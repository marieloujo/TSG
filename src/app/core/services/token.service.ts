import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  tokenExists(): boolean {
    return localStorage.getItem('access_token')  !== null;
  }

  deleteToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

}
