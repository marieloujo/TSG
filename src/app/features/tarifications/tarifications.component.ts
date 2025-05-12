import { Component } from '@angular/core';
import { Tarification } from './tarifications.interface';
import { TarificationService } from './tarifications.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarifications',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, ReactiveFormsModule],
  templateUrl: './tarifications.component.html'
})
export class TarificationsComponent {

  tarifications: Tarification[] = [];
  isLoading: boolean = false;
  error: any;
  isEditMode = false;
  currentTarificationId: string | null = null;

  tarificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tarificationService: TarificationService,
    private toastr: ToastrService
  ) {
    this.tarificationForm = this.fb.group({
      station_type: ['', Validators.required],
      description: ['', Validators.required],
      hourly_rate: [0, [Validators.required, Validators.min(100)]]
    });
  }

  ngOnInit(): void {
    this.loadTarifications();
    this.toastr.success('Tarification ajouté avec succès', 'Bravo!');
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentTarificationId = null;
    this.tarificationForm.reset();
  }

  openEditModal(tarif: Tarification): void {
    this.isEditMode = true;
    this.currentTarificationId = tarif.id;
    this.tarificationForm.patchValue(tarif);
  }

  submitForm(): void {
    if (this.tarificationForm.invalid) return;

    this.isLoading = true;
    const data = this.tarificationForm.value;

    const request$ = this.isEditMode
      ? this.updateTarification({ ...data, id: this.currentTarificationId! })
      : this.addTarification(data);
  }

  // Charger les tarifications
  loadTarifications(): void {
    this.isLoading = true;
    this.tarificationService.getTarifications().subscribe({
      next: (response) => {
        this.tarifications = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
        this.toastr.error('Échec de chargement des tarifications', 'Oups!');
      }
    });
  }

  // Ajouter une nouvelle tarification
  addTarification(tarification: Tarification): void {
    this.tarificationService.addTarification(tarification).subscribe({
      next: (response) => {
        this.tarifications.push(response);
        this.toastr.success('Tarification ajouté avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de l\'ajout d\'un tarif', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
        this.closeForm();
      }
    });
  }

  // Mettre à jour une tarification existante
  updateTarification(tarification: Tarification): void {
    this.tarificationService.updateTarification(tarification).subscribe({
      next: (response) => {
        const index = this.tarifications.findIndex(t => t.id === response.id);
        if (index !== -1) {
          this.tarifications[index] = response;
        }
        this.toastr.success('La tarification a été mis à jour avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de la mise à jour du tarif', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
        this.closeForm();
      }
    });
  }

  // Supprimer une tarification
  deleteTarification(tarificationId: string): void {
    this.tarificationService.deleteTarification(tarificationId).subscribe({
      next: () => {
        this.tarifications = this.tarifications.filter(t => t.id !== tarificationId);
        this.toastr.success('La tarification a été supprimé avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de la suppression du tarif', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  closeForm() {
    (document.querySelector('.btn-close') as HTMLElement)?.click();
  }

}
