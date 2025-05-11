import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router, private tokenService: TokenService, private toastrService: ToastrService) {}

  handleError(error: any): void {
    if (error.status === 401) {
      this.tokenService.deleteToken()
      this.toastrService.error("Votre session a expiré veuillez vous reconnecter", "Session expiré")
      this.router.navigate(['/auth/login']);
    } else {
      console.error('Une erreur s\'est produite:', error);
    }
  }
}
