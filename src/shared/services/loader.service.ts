import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  private requests = 0;

  show() {
    this.requests++;
    this.loadingSubject.next(true);
  }

  hide() {
    if (this.requests > 0) {
      this.requests--;
    }
    if (this.requests === 0) {
      this.loadingSubject.next(false);
    }
  }
} 