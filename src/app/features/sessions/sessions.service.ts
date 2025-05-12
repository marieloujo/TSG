import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/services/http-client.service';
import { Observable } from 'rxjs';
import { Session } from './sessions.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseEndpoint = 'sessions';

  constructor(private httpClientService: HttpClientService) { }

  getSessions(start_date?: string, end_date?: string): Observable<Session[]> {
    let url = `${this.baseEndpoint}/`;
    if (start_date && end_date) {
      url = url + `?start_date=${start_date}&end_date=${end_date}`;
    }
    return this.httpClientService.get<Session[]>(url);
  }

  addSession(session: Session): Observable<Session> {
    const url = `${this.baseEndpoint}/`;
    return this.httpClientService.post<Session>(url, session);
  }

  updateSession(session: Session): Observable<Session> {
    return this.httpClientService.put<Session>(`${this.baseEndpoint}/${session.id}/`, session);
  }

  deleteSession(sessionId: string): Observable<void> {
    const url = `${this.baseEndpoint}/${sessionId}/`;
    return this.httpClientService.delete<void>(url);
  }

}
