import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/services/http-client.service';
import { Observable } from 'rxjs';
import { Station } from './stations.interface';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private baseEndpoint = 'stations';

  constructor(private httpClientService: HttpClientService) { }

  getStations(): Observable<Station[]> {
    const url = `${this.baseEndpoint}/`;
    return this.httpClientService.get<Station[]>(url);
  }

  addStation(station: Station): Observable<Station> {
    const url = `${this.baseEndpoint}/`;
    return this.httpClientService.post<Station>(url, station);
  }

  updateStation(station: Station): Observable<Station> {
    return this.httpClientService.put<Station>(`${this.baseEndpoint}/${station.id}/`, station);
  }

  deleteStation(stationId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${stationId}/`;
    return this.httpClientService.delete<void>(url);
  }

}
