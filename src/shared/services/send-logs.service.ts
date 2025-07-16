import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface SendLog {
  id: number;
  promotionTitle: string;
  sentAt: string;
  status: string;
  // Adicione outros campos conforme a resposta da API
}

@Injectable({ providedIn: 'root' })
export class SendLogsService {
  private apiUrl = environment.apiUrl + '/send-logs';

  constructor(private http: HttpClient) {}

  getSendLogs(): Observable<SendLog[]> {
    return this.http.get<SendLog[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
} 