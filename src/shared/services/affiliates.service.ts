import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Affiliate {
  id: number;
  name: string;
  // Adicione outros campos conforme a resposta da API
}

@Injectable({ providedIn: 'root' })
export class AffiliatesService {
  private apiUrl = environment.apiUrl + '/affiliates';

  constructor(private http: HttpClient) {}

  getAffiliates(): Observable<Affiliate[]> {
    return this.http.get<Affiliate[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAffiliate(id: number): Observable<Affiliate> {
    return this.http.get<Affiliate>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createAffiliate(affiliate: Partial<Affiliate>): Observable<Affiliate> {
    return this.http.post<Affiliate>(this.apiUrl, affiliate).pipe(
      catchError(this.handleError)
    );
  }

  updateAffiliate(id: number, affiliate: Partial<Affiliate>): Observable<Affiliate> {
    return this.http.put<Affiliate>(`${this.apiUrl}/${id}`, affiliate).pipe(
      catchError(this.handleError)
    );
  }

  deleteAffiliate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
} 