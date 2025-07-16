import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ScrapingService {
  private magaluUrl = environment.apiUrl + '/scraping/magalu/import';

  constructor(private http: HttpClient) {}

  importMagalu(): Observable<any> {
    return this.http.post(this.magaluUrl, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
} 