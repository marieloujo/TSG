import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './form-error.component.html',
  styles: ''
})
export class FormErrorComponent {

  @Input() control: AbstractControl | null = null;

  get errorMessages(): string[] {
    const messages: string[] = [];
    if (this.control && this.control.errors) {
      for (const errorKey in this.control.errors) {
        if (errorKey === 'required') {
          messages.push('Ce champ est requis.');
        }
        if (errorKey === 'email') {
          messages.push('Ce champ doit être un email syntaxiquement correct.');
        }
        else if (errorKey === 'minlength') {
          const minLength = this.control.errors['minlength'].requiredLength;
          messages.push(`Le nombre minimum de caractère est ${minLength}.`);
        }
        else if (errorKey === 'min') {
          const min = this.control.errors['min'].min;
          messages.push(`La valeur minimale est de ${min}.`);
        }
        else if (errorKey === 'pattern') {
          messages.push('La valeur du champ n\'est pas correcte');
        }
        else if (errorKey == 'passwordMismatch') {
          messages.push('Les mots de passe ne concordent pas.');
        }
        else if (errorKey == 'passwordComplexity') {
          messages.push('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.');
        }
        else if (errorKey == 'qteExceed') {
          messages.push('La quantité excède le stok du produit.');
        }
      }
    }
    return messages;
  }

}
