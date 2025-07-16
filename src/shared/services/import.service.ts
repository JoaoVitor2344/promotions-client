import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImportService {
  private aliUrl = environment.apiUrl + '/aliexpress/import';
  private amazonUrl = environment.apiUrl + '/amazon/import';
  private mlUrl = environment.apiUrl + '/mercadolivre/import';
  private shopeeUrl = environment.apiUrl + '/shopee/import';

  constructor(private http: HttpClient) {}

  importAliExpress(): Observable<any> {
    return this.http.post(this.aliUrl, {}).pipe(
      catchError(this.handleError)
    );
  }
  importAmazon(): Observable<any> {
    return this.http.post(this.amazonUrl, {}).pipe(
      catchError(this.handleError)
    );
  }
  importMercadoLivre(): Observable<any> {
    return this.http.post(this.mlUrl, {}).pipe(
      catchError(this.handleError)
    );
  }
  importShopee(): Observable<any> {
    return this.http.post(this.shopeeUrl, {}).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    return throwError(() => error);
  }
} 