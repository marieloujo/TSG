import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../types/login-request';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormErrorComponent } from '@app/core/components/form-error/form-error.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormErrorComponent
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loading: boolean = false;
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login(): void {
    if (this.loginForm.valid) {
      this.loading = true

      const body: LoginRequest = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      }
      this.authService.login(body).subscribe({
        next: (response) => {
          this.loading = false
          this.authService.saveTokenAndUser(response)
          this.router.navigate(['/app'])
        },
        error: (err) => {
          console.error('Login error', err);
          if (err instanceof HttpErrorResponse) {
            this.handleFormErrors(err.error, err.status);
          }
          this.loading = false
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private handleFormErrors(error: any, status: number): void {
    this.errorMessage = null;
    if (status === 401) {
      this.errorMessage = "Email ou mot de passe incorrect"
    }
    else if (status == 422) {
      for (const field in error.errors) {
        if (this.loginForm.get(field)) {
          this.loginForm.get(field)!.setErrors({
            serverError: error.errors[field]
          });
        }
      }
    }
    else this.errorMessage = "Une erreur est survenue veuillez réessayer utltérieurement"
  }

}
