import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Promotion {
  id: number;
  title: string;
  description: string;
  // Adicione outros campos conforme a resposta da API
}

@Injectable({ providedIn: 'root' })
export class PromotionsService {
  private apiUrl = environment.apiUrl + '/promotions';

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createPromotion(promotion: Partial<Promotion>): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl, promotion).pipe(
      catchError(this.handleError)
    );
  }

  updatePromotion(id: number, promotion: Partial<Promotion>): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/${id}`, promotion).pipe(
      catchError(this.handleError)
    );
  }

  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  sendToTelegram(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/send-telegram`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getPendingPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/pending`).pipe(
      catchError(this.handleError)
    );
  }

  approvePromotion(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/approve`, {}).pipe(
      catchError(this.handleError)
    );
  }

  autoApprovePromotions(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auto-approve`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // Aqui pode ser customizado para logar ou exibir mensagens
    return throwError(() => error);
  }
} 