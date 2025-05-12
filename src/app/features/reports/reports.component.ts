import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from './reports.service';
import { ToastrService } from 'ngx-toastr';
import { Report, SessionReport } from './reports.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [ReactiveFormsModule, NgIf, NgFor, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html'
})
export class ReportsComponent {

  revenues: Report | undefined = undefined;
  sessions_reports: SessionReport | undefined = undefined;
  isLoading: boolean = false;
  error: any;

  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private toastr: ToastrService
  ) {
    this.reportForm = this.fb.group({
      start_date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      end_date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    }, {
      validators: (formGroup) => {
      const startDate = formGroup.get('start_date')?.value;
      const endDate = formGroup.get('end_date')?.value;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return { invalidDateFormat: true };
        }

        if (start > end) {
        return { dateRangeInvalid: true };
        }
      }
      return null;
      }
    });
  }

  ngOnInit(): void {
    this.toastr.success('Session ajouté avec succès', 'Bravo!');
  }

  submitForm(): void {
    if (this.reportForm.invalid) return;
    this.loadReports(this.reportForm.value.start_date, this.reportForm.value.end_date);
  }

  // Charger les sessions
  loadReports(start_date: string, end_date: string): void {
    // this.isLoading = true;

    this.reportService.getReportsRevenue(start_date, end_date).subscribe({
      next: (response) => {
        this.revenues = response;
        console.log(this.revenues);
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
        this.toastr.error('Échec de chargement des revenus', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
      }
    });

    this.reportService.getReportsSessions(start_date, end_date).subscribe({
      next: (response) => {
        this.sessions_reports = response;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
        this.toastr.error('Échec de chargement des sessions', 'Oups!');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
