import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Schedule {
  id: number;
  name: string;
  date: string;
  // Adicione outros campos conforme a resposta da API
}

@Injectable({ providedIn: 'root' })
export class SchedulesService {
  private apiUrl = environment.apiUrl + '/schedules';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getSchedule(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createSchedule(schedule: Partial<Schedule>): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule).pipe(
      catchError(this.handleError)
    );
  }

  updateSchedule(id: number, schedule: Partial<Schedule>): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, schedule).pipe(
      catchError(this.handleError)
    );
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
} 