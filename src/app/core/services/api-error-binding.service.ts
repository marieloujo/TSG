import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorBindingService {

  bindErrorToForm(form: FormGroup, error: any) {
    for (const field in error) {
      if (form.get(field)) {
        form.get(field)!.setErrors({
          serverError: error[field]
        });
      }
    }
  }

}