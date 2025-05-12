import { Component } from '@angular/core';
import { SessionItemComponent } from './session-item/session-item.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from './sessions.service';
import { ToastrService } from 'ngx-toastr';
import { Session } from './sessions.interface';
import { StationService } from '../stations/stations.service';
import { Station } from '../stations/stations.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-sessions',
  imports: [
    ReactiveFormsModule,
    SessionItemComponent,
    CommonModule
  ],
  templateUrl: './sessions.component.html'
})
export class SessionsComponent {

  sessions: Session[] = [];
  stations: Station[] = [];
  isLoading: boolean = false;
  error: any;
  isEditMode = false;
  currentSessionId: string | null = null;

  sessionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private stationService: StationService,
    private toastr: ToastrService
  ) {
    this.sessionForm = this.fb.group({
      player_id: ['', Validators.required],
      station_id: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSessions();
    this.loadStations();
    this.toastr.success('Session ajouté avec succès', 'Bravo!');
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentSessionId = null;
    this.sessionForm.reset();
  }

  submitForm(): void {
    if (this.sessionForm.invalid) return;

    this.isLoading = true;
    const data = this.sessionForm.value;
    this.addSession(data);
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

  // Charger les sessions
  loadSessions(): void {
    this.isLoading = true;
    this.sessionService.getSessions().subscribe({
      next: (response) => {
        this.sessions = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
        this.toastr.error('Échec de chargement des sessions', 'Oups!');
      }
    });
  }

  // Ajouter une nouvelle session
  addSession(session: Session): void {
    this.sessionService.addSession(session).subscribe({
      next: (response) => {
        this.sessions.push(response);
        this.toastr.success('Session ajouté avec succès', 'Bravo!');
      },
      error: (err) => {
        this.toastr.error('Échec de l\'ajout d\'une session', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
        this.closeForm();
      }
    });
  }

  closeForm() {
    (document.querySelector('.btn-close') as HTMLElement)?.click();
  }

}
