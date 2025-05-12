import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/services/http-client.service';
import { Observable } from 'rxjs';
import { Report, SessionReport } from './reports.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseEndpoint = 'reports';

  constructor(private httpClientService: HttpClientService) { }

  getReportsRevenue(start_date: string, end_date: string): Observable<Report> {
    const url = `${this.baseEndpoint}/revenue/?start_date=${start_date}&end_date=${end_date}`;
    return this.httpClientService.get<Report>(url);
  }

  getReportsSessions(start_date: string, end_date: string): Observable<SessionReport> {
    const url = `${this.baseEndpoint}/usage/?start_date=${start_date}&end_date=${end_date}`;
    return this.httpClientService.get<SessionReport>(url);
  }
}
