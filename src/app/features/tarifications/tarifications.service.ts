import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/services/http-client.service';
import { Observable } from 'rxjs';
import { Tarification } from './tarifications.interface';

@Injectable({
  providedIn: 'root'
})
export class TarificationService {

  private baseEndpoint = 'rates';

  constructor(private httpClientService: HttpClientService) { }

  getTarifications(): Observable<Tarification[]> {
    console.log('Fetching tarifications');
    const url = `${this.baseEndpoint}/`;
    return this.httpClientService.get<Tarification[]>(url);
  }

  addTarification(tarif: Tarification): Observable<Tarification> {
    const url = `${this.baseEndpoint}/`;
    return this.httpClientService.post<Tarification>(url, tarif);
  }

  updateTarification(tarif: Tarification): Observable<Tarification> {
    return this.httpClientService.put<Tarification>(`${this.baseEndpoint}/${tarif.id}/`, tarif);
  }

  deleteTarification(tarifId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${tarifId}/`;
    return this.httpClientService.delete<void>(url);
  }

}
