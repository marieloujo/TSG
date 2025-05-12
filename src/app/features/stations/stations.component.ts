import { Component } from '@angular/core';
import { Station } from './stations.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StationService } from './stations.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-stations',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './stations.component.html'
})
export class StationsComponent {

  stations: Station[] = [];
  isLoading: boolean = false;
  error: any;
  isEditMode = false;
  currentStationId: string | null = null;

  stationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private toastr: ToastrService
  ) {
    this.stationForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStations();
    this.toastr.success('Station ajouté avec succès', 'Bravo!');
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentStationId = null;
    this.stationForm.reset();
  }

  openEditModal(tarif: Station): void {
    this.isEditMode = true;
    this.currentStationId = tarif.id;
    this.stationForm.patchValue(tarif);
  }

  submitForm(): void {
    if (this.stationForm.invalid) return;

    this.isLoading = true;
    const data = this.stationForm.value;

    const request$ = this.isEditMode
      ? this.updateStation({ ...data, id: this.currentStationId! })
      : this.addStation(data);
  }

  // Charger les stations
  loadStations(): void {
    this.isLoading = true;
    this.stationService.getStations().subscribe({
      next: (response) => {
        this.stations = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
        this.toastr.error('Échec de chargement des stations', 'Oups!');
      }
    });
  }

  // Ajouter une nouvelle station
  addStation(station: Station): void {
    station.status = 'available'; // Set default status
    this.stationService.addStation(station).subscribe({
      next: (response) => {
        this.stations.push(response);
        this.toastr.success('Station ajouté avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de l\'ajout d\'une station', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
        this.closeForm();
      }
    });
  }

  // Mettre à jour une station existante
  updateStation(station: Station): void {
    this.stationService.updateStation(station).subscribe({
      next: (response) => {
        const index = this.stations.findIndex(t => t.id === response.id);
        if (index !== -1) {
          this.stations[index] = response;
        }
        this.toastr.success('La station a été mis à jour avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de la mise à jour de la station', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
        this.closeForm();
      }
    });
  }

  // Supprimer une station
  deleteStation(stationId: string): void {
    this.stationService.deleteStation(stationId).subscribe({
      next: () => {
        this.stations = this.stations.filter(t => t.id !== stationId);
        this.toastr.success('La station a été supprimé avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de la suppression de la station', 'Oups!');
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
