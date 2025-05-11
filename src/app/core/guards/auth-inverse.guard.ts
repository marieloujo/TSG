import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '@core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardInverse implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.tokenExists()) {
      this.router.navigate(['/app']);
      return false;
    } else {
      return true;
    }
  }
}
